// JavaScript Document


$(domReady);








function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,false))[name];
};
function findInArr(arr,item){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==item)return true;	
	}
	return false;	
}
function getByClass(oEle,className){
	var arr=[];
	if(oEle.getElementsByClassName){
		arr=oEle.getElementsByClassName(className);	
	}else{
		var aEle=oEle.getElementsByTagName('*');
		for(var i=0;i<aEle.length;i++){
			var aClass=aEle[i].className.split(' ');
			if(findInArr(aClass,className)){
				arr.push(aEle[i]);
			}	
		}	
	}
	return arr;	
};
function addWheel(obj,fn){
	function fnWheel(ev){
		var oEvent = ev||event;
			var bOk = true;
			if(oEvent.wheelDelta){
				if(oEvent.wheelDelta<0){
					bOk=true;
				}else{
					bOk=false;
				}
			}else{
				if(oEvent.detail>0){
					bOk=true;
				}else{
					bOk = false;
				}
			}
			fn&&fn(bOk);
			oEvent.preventDefault&&oEvent.preventDefault();
			return false;
	}
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);
	}else{
		obj.onmousewheel=fnWheel;
	}
};
function starMove(obj,json,options){
		options=options||{};
		options.time=options.time||'500';
		options.type=options.type||'linear';
		var star={};
		var dis={};
		for(var name in json){
			star[name]=parseFloat(getStyle(obj,name));
			if(isNaN(star[name])){
				switch(star[name]){
					case'width':
						star[name]=obj.offsetWidth;
						break;
					case'height':
						star[name]=obj.offsetHeight;
						break;
					case'top':
						star[name]=obj.offsetTop;
						break;
					case'left':
						star[name]=obj.offsetLeft;
						break;
					case'opacity':
						star[name]=1;
						break;	
				}	
			}
			dis[name]=json[name]-star[name];	
		}
		var count=Math.floor(options.time/30);
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			for(var name in json){
				switch(options.type){
				case'linear':
					var a=n/count;
					var cur=star[name]+dis[name]*a;
				break;
				case'ease-in':
					var a=n/count;
					var cur=star[name]+dis[name]*a*a*a;
				break;
				case'ease-out':
					var a=1-n/count;
					var cur=star[name]+dis[name]*(1-a*a*a);
				break;	
				}
				if(name=='opacity'){
					obj.style[name]=cur;
					obj.style.filter='alpha(opacity:'+(cur)*100+')'	
				}else{
					obj.style[name]=cur+'px';	
				}	
			}
			if(n==count){
				clearInterval(obj.timer);
				options.end&&options.end();	
			}	
	},30);	
};
function toShow(idName){
	var oParent=document.getElementById(idName);
	var oChild=oParent.children[1];
	var timer=null;
	oParent.onmouseover=function(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			oChild.style.display='block';	
		},300);	
	};
	oParent.onmouseout=function(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			oChild.style.display='none';	
		},300);	
	};	
}
function tab(sName1,sName2){
	var oUl=document.getElementById(sName1);
	var oDiv=document.getElementById(sName2);
	var aLi=oUl.children;
	var aUl=oDiv.children;
	var timer=null;
	for(var i=0;i<aLi.length-1;i++){
		(function(index){
			aLi[i].onmouseover=function(){
				clearTimeout(timer);
				timer=setTimeout(function(){
					for(var i=0;i<aLi.length-1;i++){
						aUl[i].className='clearfix';
						aLi[i].className='';	
					}
					aUl[index].className='clearfix show';
					aLi[index].className='active';	
				},300);	
			};
			aLi[i].onmouseout=function(){
				clearTimeout(timer);	
			};	
		})(i);	
	}	
}
function tab1(idName){
	var oUl=document.getElementById(idName);
	var aLi=oUl.children;
	for(var i=0;i<aLi.length;i++){
		if(i%2){
			aLi[i].style.background='#f4f4f4';	
		}else{
			aLi[i].style.background='#eeeeee';	
		}
		aLi[i].onmouseover=function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className='';	
			}
			this.className='on';	
		};	
	}	
}
function domReady(){
	toShow('record');
	toShow('tv_list');
	toShow('movie_list');
	tab('ul2','div2');
	tab('ul3','div3');
	tab('ul4','div4');
	tab('ul5','div5');
	tab('ul6','div6');
	tab1('list_1');
	tab1('list_2');
	tab1('list_3');
	var oTxt=document.getElementsByName('movie')[0];
	var oDiv=document.getElementById('search_list');
	var aLi=oDiv.getElementsByTagName('li');
	var oFrom=document.getElementById('from');
	var oBtn=document.getElementById('btn');
	var oLink1=document.createElement('link');
	var oLink2=document.createElement('link');
	var oLink3=document.createElement('link');
	var oLink4=document.createElement('link');
	var oHtml=document.documentElement.children[0];
	
	oLink1.rel='stylesheet';
	oLink1.href='css/base.css';
	oHtml.appendChild(oLink1);
	
	oLink2.rel='stylesheet';
	oLink2.href='css/head.css';
	oHtml.appendChild(oLink2);
	
	oLink3.rel='stylesheet';
	oLink3.href='css/body.css';
	oHtml.appendChild(oLink3);
	
	oLink4.rel='stylesheet';
	oLink4.href='css/foot.css';
	oHtml.appendChild(oLink4);
	
	var bOk=true;
	oFrom.onclick=function(ev){
		var oEvent=ev||event;
		oEvent.cancelBubble=true;	
	};
	oTxt.onclick=function(){
		oTxt.value='';
		if(bOk){
			oDiv.style.display='block';	
		}else{
			oDiv.style.display='none';	
		}
		bOk=!bOk;	
	};
	oBtn.onclick=function(){
		oTxt.value='鎴樼嫾';
		oDiv.style.display='none';	
	};
	for(var i=0;i<aLi.length;i++){
		(function(index){
			aLi[i].onmouseover=function(){
				this.className='clearfix on';	
			};
			aLi[i].onmouseout=function(){
				this.className='clearfix';	
			};
			aLi[i].onclick=function(){
				oTxt.value=this.children[1].innerHTML;
				oDiv.style.display='none';
				bOk=true;	
			};	
		})(i);	
	}
	document.onclick=function(){
		oDiv.style.display='none';
		if(oTxt.value==''){
			oTxt.value='鎴樼嫾';	
		}
		bOk=true;	
	};
	(function(){
		var arr=[
			{r:151,g:151,b:151},{r:194,g:103,b:98},{r:235,g:235,b:233},
			{r:25,g:1,b:14},{r:253,g:249,b:212},{r:8,g:7,b:5},
			{r:15,g:4,b:2},{r:204,g:103,b:47},{r:86,g:155,b:196}
		];
		var oBox=document.getElementById('small_box');
		var aA=oBox.children;
		var oUl=document.getElementById('ul1');
		var aLi=oUl.children;
		var oDiv=document.getElementById('big_box');
		var aImg=oDiv.children;
		var oParent=document.getElementById('box');
		var n=0;
		var timer=null;
		for(var i=0;i<aA.length;i++){
			(function(index){
				aA[i].onmouseover=function(){
					n=Math.floor(n/aA.length)*aA.length+index;
					tab();	
				};	
			})(i);	
		}
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			tab();
		},3000);
		oParent.onmouseover=function(ev){
			var oEvent=ev||event;
			var oFrom=oEvent.fromElement||oEvent.relatedTarget;
			if(oParent.contains(oFrom))return;
			clearInterval(timer);	
		};
		oParent.onmouseout=function(ev){
			var oEvent=ev||event;
			var oTo=oEvent.toElement||oEvent.relatedTarget;
			if(oParent.contains(oTo))return;
			timer=setInterval(function(){
				n++;
				tab();	
			},3000);	
		};
		function tab(){
			var json=arr[n%aA.length];
			for(var i=0;i<aA.length;i++){
				aA[i].className='';
				aImg[i].style.display='none';
				aLi[i].className='';
				starMove(aImg[i],{opacity:0});	
			}
			aA[n%aA.length].className='on';
			aImg[n%aA.length].style.display='block';
			aLi[n%aA.length].className='on';
			oDiv.style.background='rgb('+json.r+','+json.g+','+json.b+')';
			starMove(aImg[n%aA.length],{opacity:1});	
		}	
	})();
	(function(){
		var oBar=document.getElementById('bar');
		var oBox=document.getElementById('wheel_box');
		var oBg=document.getElementById('bar_parent');
		var oDiv1=document.getElementById('list_parent');
		var oUl=document.getElementById('wheel_list');
		var oUl2=document.getElementById('week');
		var aA=getByClass(oUl,'a');
		var aLi=oUl2.children;
		//var nT=oUl.children[0].offsetHeight;
		//alert(nT);
		var nT=280;
		for(var i=0;i<aLi.length;i++){
			(function(index){
				aLi[i].onclick=function(){
					var moveT=-index*nT;
					var scale = moveT/(oDiv1.offsetHeight-oUl.offsetHeight);
					for(var i=0;i<aLi.length;i++){
						aLi[i].className='';
						aA[i].className='a';	
					}
					this.className='active';
					aA[index].className='active a';
					oUl.style.top=moveT+'px'
					oBar.style.top=scale*(oBg.offsetHeight-oBar.offsetHeight)+'px';	
				};	
			})(i);	
		}
		oBar.onmousedown=function(ev){
			var oEvent=ev||event;
			var disY=oEvent.clientY-oBar.offsetTop;
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				var t=oEvent.clientY-disY;
				setTop(t);	
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				oBar.releaseCapture&&oBar.releaseCapture();	
			};
			oBar.setCapture&&oBar.setCapture();
			return false;	
		};
		function setTop(t){
			if(t<0){
				t=0;
			}else if(t>oBg.offsetHeight-oBar.offsetHeight){
				t = oBg.offsetHeight-oBar.offsetHeight;
			}
			oBar.style.top = t+'px';
			var scale = t/(oBg.offsetHeight-oBar.offsetHeight);
			oUl.style.top=scale*(oDiv1.offsetHeight-oUl.offsetHeight)+'px';
		}
		addWheel(oBox,function(bOk){
			var t = oBar.offsetTop;
			if(bOk){
				t+=10;
			}else{
				t-=10;
			}
			setTop(t);
		});	
	})();
	(function(){
		var oBox=document.getElementById('opa_box');
		var aDiv=getByClass(oBox,'show');
		var aPa=getByClass(oBox,'opa');
		var oUl=document.getElementById('ul7');
		var aLi=oUl.children;
		var timer=null;
		for(var i=0;i<aPa.length;i++){
			(function(index){
				aPa[i].onmouseover=function(){
					starMove(this,{opacity:1},{time:300});	
				};
				aPa[i].onmouseout=function(){
					starMove(this,{opacity:0},{time:300});	
				};	
			})(i);	
		}
		for(var i=0;i<aLi.length;i++){
			(function(index){
				aLi[i].onmouseover=function(){
					clearTimeout(timer);
					timer=setTimeout(function(){
						for(var i=0;i<aLi.length;i++){
							aDiv[i].className='show';
							aLi[i].className='';	
						}
						aDiv[index].className='active show';
						aLi[index].className='active';	
					},300);	
				};
				aLi[i].onmouseout=function(){
					clearTimeout(timer);	
				};	
			})(i);		
		}	
	})();
	(function(){
		var oFixed=document.getElementById('fixed');
		var timer=null;
		var bOk=true;
		window.onscroll=window.onresize=function(){
			if(bOk){
				clearInterval(timer);	
			}
			bOk=true;
			var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
			var winH=document.documentElement.clientHeight;
			if(scrollT>600){
				if(window.navigator.userAgent.toLowerCase().indexOf('msie 6.0')!=-1){
					starMove(oFixed,{top:scrollT+winH-oFixed.offsetHeight-200},{time:600,type:'ease-out'});	
				}
				oFixed.style.display='block';	
			}else{
				oFixed.style.display='none';	
			}
		};	
		oFixed.onclick=function(){
			var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
			var count = Math.floor(2000/30);
			var dis = 0-scrollT;
			var n =0;
			clearInterval(timer);
			timer = setInterval(function(){
				bOk = false;
				n++;
				var a= 1-n/count;
				document.documentElement.scrollTop=document.body.scrollTop=scrollT+dis*(1-Math.pow(a,3));
				if(n==count){
					clearInterval(timer);	
				}
			},30);	
		};	
	})();
		
}
function $(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			fn&&fn();
		},false);
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState=='complete'){
				fn&&fn();	
			}	
		});
	}
}



























