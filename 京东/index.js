
window.onload=function(){
	aa('panda','win','can')
	aa('panda1','win1','can1')
	aa('panda2','win2','can2')
	aa('panda3','win3','can3')
	aa('panda4','win4','can4')
	aa('panda5','win5','can5')
	aa('panda6','win6','can6')
	aa('panda7','win7','can7')
	var oli=document.getElementById('li');
	var div=oli.getElementsByTagName('div')[0];
	var dt=document.getElementById('dt');
	var btn=dt.getElementsByTagName('a')[0];
	var dd=document.getElementById('dd');
	
	var oAdre=document.getElementById('adress');
	var aA=dd.getElementsByTagName('a');
	//alert(aA.length);
	
	var btn1=document.getElementById('click');
	var _btn=document.getElementById('an');
	var span=_btn.getElementsByTagName('span');
	var png=document.getElementById('pic');
	var ali=png.getElementsByTagName('li');
	var left=document.getElementById('jtz');
	var right=document.getElementById('jty');
	var b1=left.getElementsByTagName('b')[0];
	var b2=right.getElementsByTagName('b')[0];
	var oul=document.getElementById('nick');
		
		
	left.onmouseover=function(){
		this.style.background='#f5f5f5';
		b1.className='#jtz b'
	}
	left.onmouseout=function(){
		this.style.background='';
		b1.className='#jtz jt1'		
	}
	var po=0;
	left.onclick=function(){
		po=po-609;
		if(po<-1218){po=-1218;}
		oul.style.left=po+'px';
		
	}    
	right.onclick=function(){
		po=po+609;
		if(po>0){po=0;}
		oul.style.left=po+'px';		
	}  
	right.onmouseover=function(){
		this.style.background='#f5f5f5';
		b2.className='#jty b'		
	}
	right.onmouseout=function(){
		this.style.background=''
		b2.className='#jty jt2'		
	}
	
	for(var i=0;i<span.length;i++){
		span[i].index=i;
		span[i].onmouseover=function(){
			for(var j=0;j<span.length;j++){
				span[j].className='';
				ali[j].className='';
			}
			this.className='active';
			ali[this.index].className='show1';
		}	
		
	}
			
	btn1.onclick=function(){
		dd.style. display='none';		
	}
	
	for(var i=0;i<aA.length;i++){
		aA[i].onclick=function(){
			oAdre.innerHTML=this.innerHTML;
		};
	}
	
	btn.onclick=function(){
		if(dd.style.display=='block'){
			dd.style.display='none';
		}else{
			dd.style.display='block';	
		}
	}
	
	oli.onmouseover=function(){
		div.style  .display='block';		
	}
	oli.onmouseout=function(){
		div.style  .display='none';		
	}
	    
}
function aa(w,e,d){
	var bt=document.getElementById(d)
	var bli=bt.getElementsByTagName('li')
	var oi=bt.getElementsByTagName('i')
	
	var lu=document.getElementById(e)
	var pli=lu.getElementsByTagName('li')
	
	var odiv=document.getElementById(w)
	var ospan=odiv.getElementsByTagName('span')
	
	for(var i=0;i<bli.length;i++){
		bli[i].index=i;
		bli[i].onmouseover=function(){
			for(var j=0;j<bli.length;j++){
				bli[j].className='fl';	
			}
			this.className='move1 fl';
			oi[this.index].className='move2';	
		}		
	}
	for(var i=0;i<ospan.length;i++){
		ospan[i].index=i;
		ospan[i].onmouseover=function(){
			for(var j=0;j<ospan.length;j++){
				ospan[j].className='';
				pli[j].className='';
			}
			this.className='color'
			pli[this.index].className='show2'
		}
	}
	   
}