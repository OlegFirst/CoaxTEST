function submiting(departure,destination){
		
	var firstPoint=secondPoint={};
	
	//Recognizing the fist point for calculation
	if (departure[0]<=destination[0]){
		firstPoint={
			x: departure[0],
			y: departure[1]
		};
		secondPoint={
			x: destination[0],
			y: destination[1]
		};
	}
	else{
		firstPoint={
			x: destination[0],
			y: destination[1]
		};
		secondPoint={
			x: departure[0],
			y: departure[1]
		}
	}
	//Drawing network and showing points
	network();
	pathPoints(departure,destination);
	
	var x=firstPoint.x;
	var y=firstPoint.y;
	var total=0;
	var step=0.1;
	var polygon=[];//Trek
	polygon.push(firstPoint);
	
	// Go to the 'secondPoint'(start moving right)
	if (Number.isInteger(firstPoint.y)){
		//We are moving right if 'y' equals INTEGER only
		x=+moveX(x,secondPoint.x,y,step).toFixed(1);
		polygon.push({x:x,y:y});
	}
	//Move up/down
	y=+moveY(y,secondPoint.y,x,step).toFixed(1);
	polygon.push({x:x,y:y});
	//Move right/left
	x=+moveX_last(x,secondPoint.x,y,step).toFixed(1);
	polygon.push({x:x,y:y});
	//Exceptions. Add one more step.
	if (!Number.isInteger(firstPoint.y)){
		//We didn`t do the first step
		y=+moveY_last(y,secondPoint.y,x,step).toFixed(1);
		polygon.push({x:x,y:y});
	}
	if (departure[0]>destination[0]){
		//The 'firstPoint' is the 'destination'
		y=+moveY_last(y,secondPoint.y,x,step).toFixed(1);
		polygon.push({x:x,y:y});
	}
	
	//Results
	polygonDraws(polygon);
	for (var i=1; i<polygon.length; i++)
		total+=vectorLength(polygon[i-1],polygon[i]);
	document.querySelector("#result").innerHTML="perfectCity="+total.toFixed(1);
					
	//Moving
	function moveX(pointStart,pointEnd,y,step){
		if (pointStart<pointEnd){
			while(pointStart<pointEnd)
				pointStart=+(pointStart+step).toFixed(1);
			pointStart=isInteger(pointStart,"back");
		}
		else if (pointStart>pointEnd){
				while(pointStart>pointEnd)
					pointStart=+(pointStart-step).toFixed(1);
				pointStart=isInteger(pointStart,"");
			}
		return pointStart;
	}
	function moveY(pointStart,pointEnd,x,step){
		if (pointStart<pointEnd){
			while(pointStart<pointEnd)
				pointStart=+(pointStart+step).toFixed(1);
			pointStart=isInteger(pointStart,"back");
		}
		else if (pointStart>pointEnd){
				while(pointStart>pointEnd)
					pointStart=+(pointStart-step).toFixed(1);
				pointStart=isInteger(pointStart,"");
			}
		return pointStart;
	}
	
	//Moving last step
	function moveX_last(pointStart,pointEnd,y,step){
		if (pointStart<pointEnd){
			while(pointStart<pointEnd)
				pointStart=+(pointStart+step).toFixed(1);
		}
		else{
			while(pointStart>pointEnd)
				pointStart=+(pointStart-step).toFixed(1);
			}
		return pointStart;
	}
	function moveY_last(pointStart,pointEnd,x,step){
		if (pointStart<pointEnd){
			while(pointStart<pointEnd)
				pointStart=+(pointStart+step).toFixed(1);
		}
		else{
			while(pointStart>pointEnd)
				pointStart=+(pointStart-step).toFixed(1);
		}
		return pointStart;
	}
	
	//Check for whole end-cell and go back/ahead
	function isInteger(arg,direction){
		if (!Number.isInteger(arg))
			arg=(direction==="back") ? Math.floor(arg) : Math.ceil(arg);
		return arg;
	}
	
	//Calculate vector-length
	function vectorLength(point1,point2){
		var coordinates={
			x: point2.x-point1.x,
			y: point2.y-point1.y
		};
		return Math.sqrt(coordinates.x*coordinates.x+coordinates.y*coordinates.y);
	}
}

//Form validation
function formValidation(){
	var inputs=document.getElementsByTagName("input");
	var isValid=true;
	for (var i=0; i<inputs.length-1; i++){
		if (isNaN(inputs[i].value) || inputs[i].value===""){
			inputs[i].value="Must be a number";
			isValid=false;
		}
		else{
			if (inputs[i].value<0 || inputs[i].value>10){
				inputs[i].value="Number isn`t correct";
				isValid=false;
			}
		}
	}
	if (isValid){
		var departureObj={x: +inputs[0].value, y: +inputs[1].value};
		var destinationObj={x: +inputs[2].value, y: +inputs[3].value};
		submiting([departureObj.x,departureObj.y],[destinationObj.x,destinationObj.y]);
	}
}