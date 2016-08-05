// set some generic vars
autowatch =1;
var width = 600;
var height = 600;
var mouseX = 0;
var mouseY = 0;

mgraphics.init();
mgraphics.relative_coords = 0;
// project specific vars
var tileCount = 10;

var currentShape = "module_1.svg";

var tileWidth = width/tileCount;
var tileHeight = height/tileCount;

var shapeSize = 50.;
var newShapeSize = shapeSize;

var shapeAngle = 0.;
var maxDist = Math.sqrt((width*width)+(height*height)); 

var forLater; // this is the external render context

var fillMode = 0;
var sizeMode = 0;

function paint(){
	with (mgraphics) {
        // background erase
		set_source_rgba(1, 1, 1, 1);
		paint();
        // background erase
        
      //  push_group();
		for (var gridY=0; gridY<tileCount; gridY++) {
			for (var gridX=0; gridX<tileCount; gridX++) {
                
                var posX = width/tileCount*gridX;
                var posY = height/tileCount*gridY;
                
                var angle = Math.atan2(mouseY-posY, mouseX-posX) + (shapeAngle*(Math.PI/180.0));
                
                if (sizeMode == 0){
                    newShapeSize = shapeSize;
                }
                if (sizeMode == 1){
                    newShapeSize = shapeSize*1.5 - map(getDistance(mouseX, mouseY, posX, PosY),0, 500, 5, shapeSize);
                }
                if (sizeMode == 2){
                    newShapeSize = map(getDistance(mouseX, mouseY, posX, PosY),0, 500, 5, shapeSize);;
                }
                save();
                translate(posX, posY);
                rotate(angle);
                svg_render(currentShape);
                restore();
            }
		}
    }
}

function makeLines(){

}

	
function randomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}	
	
function onidle(x,y,but,cmd,shift,capslock,option,ctrl){
	mouseX = x;
	mouseY = y;    
    mgraphics.redraw();
}


function onclick(x,y,but,cmd,shift,capslock,option,ctrl){
   // makeLines();
}

function map(value, istart, istop, ostart, ostop){
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

function getDistance(x1,y1,x2,y2){
   return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
}