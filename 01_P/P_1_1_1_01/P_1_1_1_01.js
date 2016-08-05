autowatch = 1;

var stepX = 2;
var stepY = 2;
var mouseX = 0;
var mouseY = 0;
var aSketch = new JitterObject("jit.lcd");
aSketch.size = [800, 400];


function x(_mouseX){
	mouseX = _mouseX;
	}
	
function y(_mouseY){
	mouseY = _mouseY;
	}
	
function bang(){
	for(var gridY = 0; gridY<400; gridY++){
		for(var gridX = 0; gridX<800; gridX++){
			outlet (0, gridX + " " + 400-gridY + " " + 255);
		//	aSketch.drawrect(gridX, gridY, stepX, stepY);
			}
		}
	}