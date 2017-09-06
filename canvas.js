var canvas=ctx=null;
var zoomX=zoomY=0;
		
//Network
function network(){
	canvas=document.querySelector("canvas");
	ctx=canvas.getContext("2d");
	ctx.fillStyle="white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	var dX=30;
	var dY=15;
	zoomX=30;
	zoomY=15;
	ctx.strokeStyle="#bfbfbf";
	var y=0;
	var x=0;
	for (var i=0; i<10; i++){
		ctx.moveTo(x,0);
		ctx.lineTo(x,canvas.height);
		ctx.stroke();
		x+=dX;
	}
	for (var j=0; j<10; j++){
		ctx.moveTo(0,y);
		ctx.lineTo(canvas.width,y);
		ctx.stroke();
		y+=dY;
	}
}

//Drawing the departure and destination points
function pathPoints(departure,destination){
	ctx.beginPath();
	ctx.fillStyle="#008000";
	ctx.arc(departure[0]*zoomX,departure[1]*zoomY,4,0,2*Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle="#ff0000";
	ctx.arc(destination[0]*zoomX,destination[1]*zoomY,4,0,2*Math.PI);
	ctx.fill();
}

//Polygon draws
function polygonDraws(polygon){
	for (var i=1; i<polygon.length; i++){
		ctx.strokeStyle="#000080";
		ctx.moveTo(polygon[i-1].x*zoomX,polygon[i-1].y*zoomY);
		ctx.lineTo(polygon[i].x*zoomX,polygon[i].y*zoomY);
		ctx.stroke();
	}
}