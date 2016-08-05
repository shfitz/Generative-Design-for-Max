autowatch =1;
var width = 550;
var height = 550;
var mouseX = 0;
var mouseY = 0;

mgraphics.init();
mgraphics.relative_coords = 0;

function paint(){
	mgraphics.set_source_rgba(1, 1, 1, 1);
	mgraphics.paint();
	
	var circleRes = 2+ (20 - 2)*((mouseY -0)/ (height-0));
	var rad = mouseX-width/2 + .5;
	var angle = (Math.PI*2)/circleRes;
	var wide = mouseY/20;
	    
	mgraphics.translate(width/2, height/2);
	mgraphics.set_source_rgb(0,0, 0,0);	
	
	mgraphics.set_line_cap("round");
	mgraphics.set_line_width(wide);

	for(var i=0;i<=circleRes;i++){
		var x = Math.cos(angle*i)*rad;
		var y = Math.sin(angle*i)*rad;
		mgraphics.move_to(0,0);
		mgraphics.line_to(x,y);
		mgraphics.stroke_preserve();
	}

}
	
function onidle(x,y,but,cmd,shift,capslock,option,ctrl){
	mouseX = x;
	mouseY = y;
	mgraphics.redraw();
}