// set some generic vars
autowatch =1;
var width = 600;
var height = 600;
var mouseX = 0;
var mouseY = 0;

mgraphics.init();
mgraphics.relative_coords = 0;

// project specific vars
var tileCount = 20;
var actStrokeCap = "round";
var setting = 0;

var theVals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

makeLines();

function paint(){
	with (mgraphics) {
		set_source_rgba(1, 1, 1, 1);
		paint();
		set_source_rgba(0, 0, 0, 1);
		var counter = 0;
        set_line_cap(actStrokeCap);
		for (var gridY=0; gridY<tileCount; gridY++) {
			for (var gridX=0; gridX<tileCount; gridX++) {
                var posX = width/tileCount*gridX;
                var posY = height/tileCount*gridY;
                if(theVals[counter] == 0){
				    set_line_width(mouseX/20);
				    move_to(posX, posY);
				    line_to(posX+width/tileCount, posY+height/tileCount);
                    stroke();
                }
                if(theVals[counter] == 1){
				    set_line_width(mouseY/20);
				    move_to(posX, posY+height/tileCount);
				    line_to(posX+width/tileCount, posY);
                    stroke();
                }
                counter++;
            }
		}
    }
}

function makeLines(){
    for (var i=0; i<tileCount*tileCount; i++) {
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
	mgraphics.redraw();
}

function cap(type_of_cap){
    if(type_of_cap == 1){
        actStrokeCap = "round"
        mgraphics.redraw();
    }
    if(type_of_cap == 2){
        actStrokeCap = "butt"
        mgraphics.redraw();
    }
    if(type_of_cap == 3){
        actStrokeCap = "square"
        mgraphics.redraw();
    }
}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl){
    makeLines();
}