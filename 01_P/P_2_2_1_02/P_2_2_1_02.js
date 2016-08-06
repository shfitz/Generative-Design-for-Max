// set some generic vars
autowatch = 1;
var width = 400;
var height = 400;
var mouseX = 0;
var mouseY = 0;
var mgraphics = new MGraphics(400, 400);
var outmatrix = new JitterMatrix(4, "char", 400, 400);
//mgraphics.relative_coords = 0; // not needed when matrixing?
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
var direction = 0
var drawMode = 0;
var counter = 0;
var posX = width / 2;
var posY = height / 2;

function bang() {
    with(mgraphics) {
        set_source_rgba(1, 1, 1, .01);
        paint();
        for (var i = 0; i <= mouseX; i++) {
            counter++;
            if (drawMode == 2) {
                direction = randomInt(0, 3);
            }
            else {
                direction = randomInt(0, 7);
            }
            if (direction == NORTH) {
                posY -= stepSize;
            }
            else if (direction == NORTHEAST) {
                posX += stepSize;
                posY -= stepSize;
            }
            else if (direction == EAST) {
                posX += stepSize;
            }
            else if (direction == SOUTHEAST) {
                posX += stepSize;
                posY += stepSize;
            }
            else if (direction == SOUTH) {
                posY += stepSize;
            }
            else if (direction == SOUTHWEST) {
                posX -= stepSize;
                posY += stepSize;
            }
            else if (direction == WEST) {
                posX -= stepSize;
            }
            else if (direction == NORTHWEST) {
                posX -= stepSize;
                posY -= stepSize;
            }
            if (posX > width) posX = 0;
            if (posX < 0) posX = width;
            if (posY < 0) posY = height;
            if (posY > height) posY = 0;
            if (drawMode == 3) {
                if (counter >= 100) {
                    counter = 0;
                    set_source_rgba(.1, .1, .6, .7);
                    ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter+7, diameter+7);
                    stroke();
                }
            }
            set_source_rgba(0, 0, 0, .15);
            ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter, diameter);
            stroke();
        }
    }
    var theImage = new Image(mgraphics);
    theImage.tonamedmatrix(outmatrix.name);
    outlet(0, "jit_matrix", outmatrix.name);
    gc();
}
//-------- BEGIN GENERIC UTILITY FUNCTIONS
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function keypressed(key) {
    if (key == 1) {
        drawMode = 1;
        stepSize = 1;
        diameter = 1;
    }
    if (key == 2) {
        drawMode = 2;
        stepSize = 1;
        diameter = 1;
    }
    if (key == 3) {
        drawMode = 3;
        stepSize = 10;
        diameter = 5;
    }
}

function mX(x) {
    mouseX = x;
}

function mY(y) {
    mouseY = y;
}

function onclick(x, y, but, cmd, shift, capslock, option, ctrl) {
    //  makeLines();
}

function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}