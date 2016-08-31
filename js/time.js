function time_top(){		
	function rnd(m,n){
		return Math.floor(Math.random()*(n-m)+1);	
	}
	//var oBox=document.querySelector('.box1');
	var oBox=document.getElementById('box1');
	var oh=document.querySelector('.h');
	var om=document.querySelector('.m');
	var os=document.querySelector('.s');
	var oWeek=document.querySelector('.week');
	var arr=['日','一','二','三','四','五','六'];
	var n=60;
	for(var i=0;i<n;i++){
		oSpan=document.createElement('span');
		oSpan.style.WebkitTransform='rotate('+i*6+'deg)';
		if(i%5==0){
			oSpan.className='hh';
			oSpan.innerHTML='<i>'+(i/5||12)+'<i>';
			oSpan.style.background='red';
			var oI=oSpan.firstChild;
			oI.style.WebkitTransform='rotate('+(-i*6)+'deg)';	
		}
		oBox.appendChild(oSpan);	
	}
	/*setInterval(function(){
		oBox.style.background='url(img2/'+rnd(1,11)+'.jpg) no-repeat';
		oBox.style.backgroundSize='100%';	
	},1000);*/
	function time3(){
		var oDate=new Date();
		var h=oDate.getHours();
		var m=oDate.getMinutes();
		var s=oDate.getSeconds();
		var w=oDate.getDay();
		oh.style.WebkitTransform='rotate('+(h*30+m/60*30)+'deg)';
		om.style.WebkitTransform='rotate('+(m*6+s/60*6)+'deg)';
		os.style.WebkitTransform='rotate('+(s*6)+'deg)';
		oWeek.innerHTML='星期'+arr[w];	
	}
	time3();
	setInterval(time3,1000);	
	
	
	//var oBox = document.getElementById('box1');
	
	//function time_move(){
	
		var iSpeedX = 0;
		var iSpeedY = 0;
		var lastX = 0;
		var lastY = 0;
		oBox.onmousedown=function(ev){
			clearInterval(oBox.timer);
			var oEvent = ev||event;
			var disX = oEvent.clientX-oBox.offsetLeft;
			var disY = oEvent.clientY-oBox.offsetTop;
			document.onmousemove=function(ev){
				var oEvent = ev||event;
				oBox.style.left = oEvent.clientX-disX+'px';
				oBox.style.top = oEvent.clientY-disY+'px';
				
				iSpeedX = oEvent.clientX-lastX;
				iSpeedY = oEvent.clientY-lastY;
				
				lastX = oEvent.clientX;
				lastY = oEvent.clientY;
			};
			document.onmouseup=function(){
				document.onmousemove = null;
				document.onmouseup=null;
				
				//alert(iSpeedX+','+iSpeedY);
				
				move3(oBox);
				
				oBox.releaseCapture&&oBox.releaseCapture();
			};
			oBox.setCapture&&oBox.setCapture();
			return false;
		};
	//}
	//time_move();
	move3(oBox);
	function move3(obj){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			iSpeedY+=3;
			
			var l = obj.offsetLeft+iSpeedX;
			var t = obj.offsetTop+iSpeedY;
			
			if(t>=(document.documentElement.clientHeight-obj.offsetHeight)){
				t = document.documentElement.clientHeight-obj.offsetHeight;
				iSpeedY*=-0.85;
				iSpeedX*=0.85;
			}
			
			if(t<=0){
				t = 0;
				iSpeedY*=-0.85;
				iSpeedX*=0.85;
			}
			
			if(l>(document.documentElement.clientWidth-obj.offsetWidth)){
				l = document.documentElement.clientWidth-obj.offsetWidth;
				iSpeedX*=-0.85;
				iSpeedY*=0.85;
			}
			
			if(l<=0){
				l = 0;
				iSpeedX*=-0.85;
				iSpeedY*=0.85;
			}
			
			obj.style.left = l+'px';
			obj.style.top = t+'px';
			
			
			if(Math.abs(iSpeedX)<1)iSpeedX=0;
			if(Math.abs(iSpeedY)<1)iSpeedY=0;
			
			if(iSpeedX==0&&iSpeedY==0&&obj.offsetTop>=(document.documentElement.clientHeight-obj.offsetHeight)){
				clearInterval(obj.timer);
			}
		},30);
	}
	
	
	
}
