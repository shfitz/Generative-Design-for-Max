// set some generic vars
autowatch = 1;
var width = 400;
var height = 400;
var mouseX = 0;
var mouseY = 0;

mgraphics.init();
mgraphics.relative_coords = 0;

// project specific vars

var outmatrix = new JitterMatrix(4, "char", 400, 400);


var NORTH = 0;
var NORTHEAST = 1;
var EAST = 2;
var SOUTHEAST = 3;
var SOUTH = 4;
var SOUTHWEST = 5;
var WEST = 6;
var NORTHWEST = 7;
var stepSize = 1;
var diameter = 1;

var direction = 0;
var posX = width / 2;
var posY = height / 2;

//mgraphics.redraw();

function paint() {
    gc();
    var theOut = null;
  with(mgraphics) {
    push_group();
 
      set_source_rgba(0, 0, 0, .15);

      for (var i = 0; i <= mouseX; i++) {
      direction = randomInt(0, 8);

      if (direction == NORTH) {
        posY -= stepSize;
      } else if (direction == NORTHEAST) {
        posX += stepSize;
        posY -= stepSize;
      } else if (direction == EAST) {
        posX += stepSize;
      } else if (direction == SOUTHEAST) {
        posX += stepSize;
        posY += stepSize;
      } else if (direction == SOUTH) {
        posY += stepSize;
      } else if (direction == SOUTHWEST) {
        posX -= stepSize;
        posY += stepSize;
      } else if (direction == WEST) {
        posX -= stepSize;
      } else if (direction == NORTHWEST) {
        posX -= stepSize;
        posY -= stepSize;
      }

      if (posX > width) posX = 0;
      if (posX < 0) posX = width;
      if (posY < 0) posY = height;
      if (posY > height) posY = 0;

      ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter, diameter);
      stroke();

    }
                
    	identity_matrix();
		theOut = new Image(pop_group());
		image_surface_draw(theOut);
  }
    theOut.tonamedmatrix(outmatrix.name);
    outlet(0, "jit_matrix", outmatrix.name);
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function bang(){
      mgraphics.redraw();
}

function onidle(x, y, but, cmd, shift, capslock, option, ctrl) {
  mouseX = x;
  mouseY = y;
}

function onclick(x, y, but, cmd, shift, capslock, option, ctrl) {
//  makeLines();
}

function map(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}