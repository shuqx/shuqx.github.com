function canvas(){
	function rnd(n,m){
		return Math.floor(Math.random()*(m-n));
	}
	function canv(){
		var oC=document.getElementById('c1');
		var gd=oC.getContext('2d');
		var N=5;
		var aPoint=[];
		var LEN=20;
		var oldPoint=[];
		for(var i=0;i<N;i++){
			aPoint.push({
				x:rnd(0,oC.width),
				y:rnd(0,oC.height),
				iSpeedX:rnd(-8,7),
				iSpeedY:rnd(-5,5)
			});
		}
		
		var r=rnd(0,256),
			g=rnd(0,256),
			b=rnd(0,256)
			
			rS=rnd(-10,10),
			gS=rnd(-10,10),
			bS=rnd(-10,10);
		setInterval(function(){
			gd.clearRect(0,0,oC.width,oC.height);
			for(var i=0;i<N;i++){
				aPoint[i].x+=aPoint[i].iSpeedX;
				aPoint[i].y+=aPoint[i].iSpeedY;
				
				if(aPoint[i].x<0){
					aPoint[i].x=0;
					aPoint[i].iSpeedX*=-1;
				}
				
				if(aPoint[i].x>oC.width){
					aPoint[i].x=oC.width;
					aPoint[i].iSpeedX*=-1;
				}
				
				if(aPoint[i].y<0){
					aPoint[i].y=0;
					aPoint[i].iSpeedY*=-1;
				}
				
				if(aPoint[i].y>oC.height){
					aPoint[i].y=oC.height;
					aPoint[i].iSpeedY*=-1;
				}
			}
			for(var i=0;i<N;i++){
				drawPoint(aPoint[i]);
			}
			gd.moveTo(aPoint[0].x,aPoint[0].y);
			for(var i=1;i<N;i++){
				gd.lineTo(aPoint[i].x,aPoint[i].y);
			}
			gd.closePath();
			gd.strokeStyle='#fff';
			gd.stroke();
			var arr=[];
			for(var i=0;i<N;i++){
				arr.push({
					x:aPoint[i].x,
					y:aPoint[i].y,
					iSpeedX:aPoint[i].iSpeedX,
					iSpeedY:aPoint[i].iSpeedY
				});
			}
			oldPoint.push(arr);
			
			if(oldPoint.length>LEN)oldPoint.shift();
			
			if(r>=255||r<=0){
				rS*=-1;
			}else if(g>=255||g<=0){
				gS*=-1;
			}else if(b>=255||b<=0){
				bS*=-1;
			}
			r+=rS;
			g+=gS;
			b+=bS;
			for(var i=0;i<oldPoint.length;i++){
				gd.beginPath();
				gd.moveTo(oldPoint[i][0].x,oldPoint[i][0].y);
				for(var j=1;j<oldPoint[i].length;j++){
					gd.lineTo(oldPoint[i][j].x,oldPoint[i][j].y);
				}
				gd.closePath();
				gd.strokeStyle='rgba('+r+','+g+','+b+','+i/LEN+')';
				gd.stroke();		
			}
		},16);
		function drawPoint(oPoint){
			gd.beginPath();
			gd.fillStyle='#fff';
			gd.fillRect(oPoint.x,oPoint.y,1,1);
		}
	}
	canv();
}