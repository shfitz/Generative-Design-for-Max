// somehting funny happens when the mouseX gets below 25
// one of the maping functions goes off the rails

// set some generic vars
autowatch =1;
var width = 800;
var height = 800;
var mouseX = 0;
var mouseY = 0;

mgraphics.init();
mgraphics.relative_coords = 0;

// project specific vars
var tileCountX = 10;
var tileCountY = 10;
var tileWidth = width/tileCountX;
var tileHeight = height/tileCountY;

var count = 0;
var colorStep = 15;
var circleCount= 1;
var endSize = tileWidth/2.0;
var endOffset = 0;

var theVals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

makeLines();

function paint(){
	with (mgraphics) {
		set_source_rgba(1, 1, 1, 1);
		paint();
		set_source_rgba(0, 0, 0, .5);

        translate((width/tileCountX)/2, (height/tileCountY)/2);

        circleCount = mouseX/50+1;
        endSize = map(mouseX, 0 , width , tileWidth/2.0, 0);
        endOffset = map(mouseY, 0, height,0,(tileWidth-endSize)/2);
        
        var counter = 0;
		for (var gridY=0; gridY<tileCountY; gridY++) {
			for (var gridX=0; gridX<tileCountX; gridX++) {
                save();
                translate(tileWidth*gridX, tileHeight*gridY);
                scale(1, tileHeight/tileWidth);
                
           
                if(theVals[counter]==0) rotate(-1*(Math.PI/2));
                if(theVals[counter]==1) rotate(0);
                if(theVals[counter]==2) rotate(Math.PI/2);
                if(theVals[counter]==3) rotate(Math.PI);
                
                for(var i =0; i<circleCount;i++){
                    var diameter = map(i, 0,circleCount-1, tileWidth,endSize);
                    var offset = map(i, 0,circleCount-1, 0,endOffset);
                    ellipse(offset-diameter/2, 0-diameter/2, diameter,diameter);
                }
  
                counter++;
                stroke();
                restore();
            }  
		}
    }
}

function makeLines(){
		for (var i=0; i<tileCountX*tileCountY; i++) {
                theVals[i] = randomInt(0,4);
        }
        mgraphics.redraw();
}

	
function randomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}	
	
function onidle(x,y,but,cmd,shift,capslock,option,ctrl){
	mouseX = x;
    if(mouseX <= 26) mouseX = 26;
	mouseY = y;
	mgraphics.redraw();
    post(mouseX);
    post();
}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl){
    makeLines();
}

function map(value, istart, istop, ostart, ostop){
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}