{
    window.onload = function () {
        const canvas = document.querySelector('canvas');
        if (typeof canvas.getContext === 'undefined') {
            return;
        }
        const ctx = canvas.getContext("2d");


        // Canvas Resize
        function fitCanvasSize() {

            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;

        }
        fitCanvasSize();
        window.onresize = fitCanvasSize;

        // RequestAnimationFrame
        (function () {
            var requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
        })();

        const colors = ['#000030', '#4d4398', '#4784bf', '#000030', '#4d4398', '#ffffff']

        //Utility Function
        function randomIntFromRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        function randomColor(colors) {
            return colors[Math.floor(Math.random() * colors.length)]
        }

        // Objects
        function Particle(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.radians = Math.random() * Math.PI * 2;
            this.velocity = 0.001;
            this.distanceFormCenter = randomIntFromRange(10, canvas.width / 2 + 100);

            this.update = () => {

                // Move points over time
                this.radians += this.velocity;

                //Circular Motion
                this.x = Math.cos(this.radians) * this.distanceFormCenter + canvas.width / 2;
                this.y = Math.sin(this.radians) * this.distanceFormCenter + canvas.height / 2;
                this.draw();
            }

            this.draw = () => {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.globalAlpha = .8;
                ctx.fill();
            };
        }

        // Implementation
        let perticles;
        function init() {
            perticles = []

            for (let i = 0; i < 1200; i++) {
                const radius = (Math.random()) + .5;
                perticles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
            }
        }

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            var g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            g.addColorStop(0, 'rgba(19,27,35,.05)');
            g.addColorStop(1, 'rgba(10,20,67,.05)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            perticles.forEach(perticles => {
                perticles.update();
            });
        }

        init();
        animate();
    }
}

		;(function(){
		  var barrageArray = [
		          {
		          },
		      ];
		  var barrageColorArray = [
		    '#0099CC','#333333', '#009966','#FFFF66','#9933FF','#FFFF99','#CCCCFF','#CC9933','#FFFF66'
		  ];
		  var barrageTipWidth = 50; //提示语的长度
		 
		  var barrageBoxWrap = document.querySelector('.barrage-container-wrap');;
		  var barrageBox = document.querySelector('.barrage-container');
		  var inputBox = document.querySelector('.input');
		  var sendBtn = document.querySelector('.send-btn');
		 
		  //容器的宽高度
		  var barrageWidth = ~~window.getComputedStyle(barrageBoxWrap).width.replace('px','');
		  var barrageHeight = ~~window.getComputedStyle(barrageBoxWrap).height.replace('px','');
		 
		  //发送
		  function sendMsg(){
		    var inputValue = inputBox.value;
		    inputValue .replace(/\ +/g, "");
		 
		    if (inputValue.length <= 0) {
		        alert('please enter');
		        return false;
		    }
		 
		    //生成弹幕
		    createBarrage(inputValue,true);
		    inputBox.value = ''; 
		  }
		   
		 
		  //创建弹幕
		  function createBarrage(msg, isSendMsg){
		    var divNode = document.createElement('div');
		    var spanNode = document.createElement('span');
		 
		    divNode.innerHTML = msg;
		    divNode.classList.add('barrage-item');
		    barrageBox.appendChild(divNode);
		 
		    
		    spanNode.classList.add('barrage-tip');
		    divNode.appendChild(spanNode);
		 
		    barrageOffsetLeft = getRandom(barrageWidth, barrageWidth*2);
		    barrageOffsetLeft = isSendMsg ? barrageWidth : barrageOffsetLeft
		    barrageOffsetTop = getRandom(10, barrageHeight-10);
		    barrageColor = barrageColorArray[Math.floor(Math.random()*(barrageColorArray.length))];
		 
		    //执行初始化滚动
		    initBarrage.call(divNode,{
		      left : barrageOffsetLeft,
		      top : barrageOffsetTop,
		      color : barrageColor
		    });
		  }
		 
		  //初始化弹幕移动(速度，延迟)
		  function initBarrage(obj) {
		    //初始化
		    obj.top = obj.top || 0;
		    obj.class = obj.color || '#fff';
		    this.style.left = obj.left + 'px';
		    this.style.top = obj.top + 'px';
		    this.style.color = obj.color;  
		 
		    //添加属性
		    this.distance = 0;
		    this.width = ~~window.getComputedStyle(this).width.replace('px','');
		    this.offsetLeft = obj.left;
		    this.timer = null;
		 
		    //弹幕子节点
		    var barrageChileNode = this.children[0];
		    barrageChileNode.style.left = (this.width-barrageTipWidth)/2 + 'px';
		 
		    //运动
		    barrageAnimate(this);
		 
		    //停止
		    this.onmouseenter = function(){
		      barrageChileNode.style.display= 'block';
		      cancelAnimationFrame(this.timer);
		    };
		 
		    this.onmouseleave = function(){
		      barrageChileNode.style.display = 'none';
		      barrageAnimate(this);
		    };
		 
		    //举报
		    barrageChileNode.onclick = function(){
		      alert('举报成功');
		    }
		  }
		  
		  //弹幕动画
		  function barrageAnimate(obj){
		    move(obj);
		 
		    if(Math.abs(obj.distance) < obj.width+obj.offsetLeft){
		      obj.timer = requestAnimationFrame(function(){
		        barrageAnimate(obj);
		      });
		    }else{
		      cancelAnimationFrame(obj.timer);
		      //删除节点
		      obj.parentNode.removeChild(obj);
		    }
		  }
		 
		  //移动
		  function move(obj){
		    obj.distance--;
		    obj.style.transform = 'translateX('+obj.distance+'px)';
		    obj.style.webkitTransform = 'translateX('+obj.distance+'px)';
		  }
		 
		  //随机获取高度
		  function getRandom(start, end){
		    return start +(Math.random() * (end - start));
		  }
		 
		 
		  /*******初始化事件**********/
		  //系统数据
		  barrageArray.forEach(function(item,index){
		    createBarrage(item.text, false);
		  });
		 
		  //点击发送
		  sendBtn.onclick = sendMsg;   //点击发送
		 
		  //回车
		  inputBox.onkeydown = function(e){
		    e = e|| window.event;
		    if(e.keyCode == 13){i
		      send();
		    }
		  }
		 
		})()
		 
		//兼容写法
		;(function() {
		    var lastTime = 0;
		    var vendors = ['webkit', 'moz'];
		    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
		                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
		    }
		 
		    if (!window.requestAnimationFrame) {
		        window.requestAnimationFrame = function(callback, element) {
		            var currTime = new Date().getTime();
		            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
		            var id = window.setTimeout(function() {
		                callback(currTime + timeToCall);
		            }, timeToCall);
		            lastTime = currTime + timeToCall;
		            return id;
		        };
		    }
		    if (!window.cancelAnimationFrame) {
		        window.cancelAnimationFrame = function(id) {
		            clearTimeout(id);
		        };
		    }
		}());
		