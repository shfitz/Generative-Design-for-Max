// set some generic vars
autowatch = 1;
var width = 400;
var height = 400;
var mouseX = 0;
var mouseY = 0;

var mgraphics = new MGraphics(width, height);
var outmatrix = new JitterMatrix(4, "char", width, height);

// project specific vars
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
mgraphics.set_source_rgba(1, 1, 1, 1);
mgraphics.paint();

function bang() {

  with(mgraphics) {
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
                
    
  }
    var theImage = new Image(mgraphics);
    theImage.tonamedmatrix(outmatrix.name);
    outlet(0, "jit_matrix", outmatrix.name);
    gc();

}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function mX(x) {
    mouseX = x;
}

function mY(y) {
    mouseY = y;
}

function map(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}