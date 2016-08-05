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
var colorLeft = 0;
var colorRight = 0;
var alphaLeft = 1.;
var alphaRight = 1.;

var theVals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,00,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

makeLines();

function paint(){
	with (mgraphics) {
		set_source_rgba(1, 1, 1, 1);
		paint();
		// set_source_rgba(0, 0, 0, 1);
		var counter = 0;
        set_line_cap(actStrokeCap);
		for (var gridY=0; gridY<tileCount; gridY++) {
			for (var gridX=0; gridX<tileCount; gridX++) {
                var posX = width/tileCount*gridX;
                var posY = height/tileCount*gridY;
                if(theVals[counter] == 0){
                    if(colorLeft == 0){
                        set_source_rgba(.8, .08, .88, alphaLeft);
                    }else{
                        set_source_rgba(0, 0, 0, alphaLeft);
                    }
				    set_line_width(mouseX/20);
				    move_to(posX, posY);
				    line_to(posX+width/tileCount, posY+height/tileCount);
                    stroke();
                }
                if(theVals[counter] == 1){
                    if(colorRight == 0){
                        set_source_rgba(.85, .6, .05, alphaRight);
                    }else{
                        set_source_rgba(0, 0, 0, alphaRight);
                    }
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
        actStrokeCap = "round";
        mgraphics.redraw();
    }
    if(type_of_cap == 2){
        actStrokeCap = "butt";
        mgraphics.redraw();
    }
    if(type_of_cap == 3){
        actStrokeCap = "square";
        mgraphics.redraw();
    }
}

function color(colorCase){
    if(colorCase == 4){
        if(colorLeft == 0){
            colorLeft = 1;
            mgraphics.redraw();
        }else{
            colorLeft = 0;
            mgraphics.redraw();
        }
    }
    if(colorCase == 5){
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
    if(alphaCase == 6){
        if(alphaLeft == 1.){
            alphaLeft = .5;
            mgraphics.redraw();
        }else{
            alphaLeft = 1.;
            mgraphics.redraw();
        }
    }
    if(alphaCase == 7){
        if(alphaRight == 1.){
            alphaRight = .5;
            mgraphics.redraw();
        }else{
            alphaRight = 1.;
            mgraphics.redraw();
        }
    }   
}

function scrap(){
    colorSetting = 0;
}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl){
    makeLines();
}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl){
    makeLines();
}