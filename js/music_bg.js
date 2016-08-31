function music(){
	function rnd(m,n){
		return Math.floor(Math.random()*(n-m));	
	}
	function toDou(iNum){
		return iNum<10?'0'+iNum:''+iNum;
	}
	function getMyTime(s){
		return toDou(Math.floor(s/60))+':'+toDou(Math.floor(s%60));
	}
	function tab2(oAu,oTit,arr,oSec){
		switch(oSec.value){
			/*case '随机播放':
				var c=arr[rnd(0,arr.length)];
				oAu.src='mp3/'+c+'.mp3';
				oAu.play();
				oTit.innerHTML=c;
			break;*/
			case '顺序播放':
				var n=rnd(0,arr.length)+1;
				if(n==arr.length){
					n=0;	
				}
				var s=arr[n];
				oAu.src='mp3/'+s+'.mp3';
				oAu.play();
				oTit.innerHTML=s;
			break;
			default:
				var d=arr[rnd(0,arr.length)];
				oAu.src='mp3/'+d+'.mp3';
				oAu.play();
				oTit.innerHTML=d;
			break;
				
		}
	}
	function music3(){
		var oTit=document.querySelector('.tit');
		var oTime=document.querySelector('.time');
		var oHand=document.querySelector('.hand');	
		var aA=oHand.children;
		var oSec=document.querySelector('.sec');
		var oAu=document.querySelector('.au');
		var oProBox = document.querySelector('.pro_box');
		var oProBar = document.querySelector('.pro_bar');
		var oProBtn = document.querySelector('.pro_btn');
		var arr=['林志炫-烟花易冷(Live)','孙燕姿-遇见','逃跑计划-夜空中最亮的星','王力宏-依然爱你','五月天-我不愿 让你一个人','许嵩-半城烟沙','许嵩-城府','许嵩-叹服','杨宗纬-空白格(Live)','郑中基-答应不爱你'];
		var h=arr[rnd(0,arr.length)];
		//alert(oSec.value);
		oAu.src='mp3/'+h+'.mp3';
		oAu.play();
		oTit.innerHTML=h;
		switch(oSec.value){
			/*case '随机播放':
				var c=arr[rnd(0,arr.length)];
				oAu.src='mp3/'+c+'.mp3';
				oAu.play();
				oTit.innerHTML=c;
			break;*/
			case '顺序播放':
				aA[0].onclick=function(){
					var m=rnd(0,arr.length)-1;
					if(m==arr.length){
						m=0;	
					}
					var a=arr[m];
					oAu.src='mp3/'+a+'.mp3';
					oAu.play();
					oTit.innerHTML=a;
				};
			break;
			default:
				aA[2].onclick=function(){
					var b=arr[rnd(0,arr.length)];
					oAu.src='mp3/'+b+'.mp3';
					oAu.play();
					oTit.innerHTML=b;
				};
			break;
				
		}
		aA[1].onclick=function(){
			if(this.innerHTML=='暂停'){
				oAu.pause();
				this.innerHTML='播放';
			}else{
				oAu.play();
				this.innerHTML='暂停';		
			}	
		};
		/*aA[0].onclick=function(){
			switch(oSec.value){
				/*case '随机播放':
					var c=arr[rnd(0,arr.length)];
					oAu.src='mp3/'+c+'.mp3';
					oAu.play();
					oTit.innerHTML=c;
				break;*/
				/*case '顺序播放':
					var m=rnd(0,arr.length)-1;
					if(m==arr.length){
						m=0;	
					}
					var a=arr[m];
					oAu.src='mp3/'+a+'.mp3';
					oAu.play();
					oTit.innerHTML=a;
				break;
				default:
					var b=arr[rnd(0,arr.length)];
					oAu.src='mp3/'+b+'.mp3';
					oAu.play();
					oTit.innerHTML=b;
				break;
					
			}
		}*/
		/*aA[2].onclick=function(){
			tab(oAu,oTit,arr,oSec);
		};*/
		oProBtn.onmousedown=function(ev){
			var disX=ev.pageX-oProBtn.offsetLeft;
			document.onmousemove=function(ev){
				var l=ev.pageX-disX;
				if(l<-6){
					l=-6;
				}else if(l>(oProBox.offsetWidth-oProBtn.offsetWidth+6)){
					l=oProBox.offsetWidth-oProBtn.offsetWidth+6;
				}
				oProBtn.style.left=l+'px';
				var scale=l/(oProBox.offsetWidth-oProBtn.offsetWidth);
				oProBar.style.width=scale*100+'%';
				
				oAu.currentTime=scale*oAu.duration;
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
			};
			return false;
		};
		oAu.ontimeupdate=function(){
			var scale=oAu.currentTime/oAu.duration;
			oProBar.style.width=scale*(oProBox.offsetWidth)+'px';
			oProBtn.style.left=scale*(oProBox.offsetWidth-oProBtn.offsetWidth)+'px';
			oTime.innerHTML=getMyTime(oAu.currentTime)+'/'+getMyTime(oAu.duration);
			function time(){
				if(getMyTime(oAu.currentTime)==getMyTime(oAu.duration)){
					tab2(oAu,oTit,arr,oSec);
				}
			}
			time();
			setInterval(time,500);
		};
	}
	music3();
}