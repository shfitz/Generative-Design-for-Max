// set some generic vars
autowatch =1;
var width = 600;
var height = 600;
var mouseX = 0;
var mouseY = 0;

mgraphics.init();
mgraphics.relative_coords = 0;
// project specific vars
var tileCount = 1;
var actStrokeCap = "round";

var colorLeft = 0;
var colorRight = 0;

var transparentLeft = false;
var transparentRight = false;

var alphaLeft = 1.;
var alphaRight = 1.;

var theVals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

makeLines();

function paint(){
	with (mgraphics) {
		set_source_rgba(1, 1, 1, 1);
		paint();

        set_line_width(mouseX/20);

        var counter = 0;
        set_line_cap(actStrokeCap);
		for (var gridY=0; gridY<tileCount; gridY++) {
			for (var gridX=0; gridX<tileCount; gridX++) {
                
                var posX = width/tileCount*gridX;
                var posY = height/tileCount*gridY;
                
                if(transparentLeft == true) {
                    alphaLeft = (gridY*10)/255;
                }else{
                    alphaLeft = 1.; 
                }
                if(transparentRight == true) {
                    alphaRight = (gridY*10)/255;
                }else{
                    alphaRight = 1.; 
                }           
                
                if(theVals[counter] == 0){
                    if(colorLeft == 0){
                        set_source_rgba(1., .0, .6, alphaLeft);
                    }else{
                        set_source_rgba(0.34901961, 0.13333333, 0.51372549, alphaLeft);
                    }
				    move_to(posX, posY);
				    line_to(posX+(width/tileCount)/2, posY+height/tileCount);		
                    
                    move_to(posX+(width/tileCount)/2, posY);
				    line_to(posX+(width/tileCount), posY+height/tileCount);
                    
                    stroke();
                }
                if(theVals[counter] == 1){
                    if(colorRight == 0){
                        set_source_rgba(0.0, 0.50980392, 0.64705882, alphaRight);
                    }else{
                        set_source_rgba(0.0, 0.0, 0.0, alphaRight);
                    }

                    move_to(posX, posY+height/tileCount);
				    line_to(posX+(height/tileCount)/2, posY);
                    
                    move_to(posX+(height/tileCount)/2, posY+width/tileCount);
				    line_to(posX+(height/tileCount), posY);
                    
                    stroke();
                }
                counter++;
            }
		}
    }
}

function makeLines(){
    for (var i=0; i<1600; i++) {
        var toggle = randomInt(0,2);
        theVals[i] = toggle;
    }
    mgraphics.redraw();
}

	
function randomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}	
	
function onidle(x,y,but,cmd,shift,capslock,option,ctrl){
	mouseX = x;
	mouseY = y;
    tileCount = mouseY/15;
    
	mgraphics.redraw();
}


function color(colorCase){
    if(colorCase == 1){
        if(colorLeft == 0){
            colorLeft = 1;
            mgraphics.redraw();
        }else{
            colorLeft = 0;
            mgraphics.redraw();
        }
    }
    if(colorCase == 2){
        if(colorRight == 0){
            colorRight = 1;
            mgraphics.redraw();
        }else{
            colorRight = 0;
            mgraphics.redraw();
        }
    }   
}

function alpha(alphaCase){
    if(alphaCase == 3){
        transparentLeft =! transparentLeft;
        mgraphics.redraw();       
    }
    if(alphaCase == 4){
        transparentRight =! transparentRight;
        mgraphics.redraw();       
    }   
}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl){
    makeLines();
}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl){
    makeLines();
}