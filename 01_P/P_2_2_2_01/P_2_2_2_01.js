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
var EAST = 1;
var SOUTH = 2;
var WEST = 3;
var angleCount = 7;
var angle = getRandomAngle(direction);
var direction = SOUTH;
var stepSize = 3;
var minLength = 3;
var posX = randomInt(0, width);
var posY = 5;
var posXcross = posX;
var posYcross = posY;

function bang() {
    with(mgraphics) {
        set_source_rgba(1, 1, 1, .01);
        paint();
        for (var i = 0; i <= mouseX; i++) {
            set_line_width(1);
            set_source_rgba(.8, .8, .8, 1.);
            move_to(posX - 1, posY - 1);
            line_to(posX, posY);
            stroke();
            var theImage = new Image(mgraphics);
            theImage.tonamedmatrix(outmatrix.name);
            outlet(0, "jit_matrix", outmatrix.name);
            posX += Math.cos(toRadians(angle)) * stepSize;
            posY += Math.sin(toRadians(angle)) * stepSize;
            var reachedBorder = false;
            if (posY <= 5) {
                direction = SOUTH;
                reachedBorder = true;
            }
            else if (posX >= width - 5) {
                direction = WEST;
                reachedBorder = true;
            }
            else if (posY >= height - 5) {
                direction = NORTH;
                reachedBorder = true;
            }
            else if (posX <= 5) {
                direction = EAST;
                reachedBorder = true;
            }
                        var px = Math.round(posX);
                        var py = Math.round(posY);
            if (getPixelVal(posX, posY) != 255 || reachedBorder) {
                angle = getRandomAngle(direction);
                var distance = dist(posX, posY, posXcross, posYcross);
                if (distance >= minLength) {
                    set_line_width(3);
                    set_source_rgba(0, 0, 0, 1);
                    move_to(pX, pY);
                    line_to(posXcross, posXcross);
                    stroke();
                }
                posXcross = posX;
                posYcross = posY;
            }
        }
    }
    var theImage = new Image(mgraphics);
    theImage.tonamedmatrix(outmatrix.name);
    outlet(0, "jit_matrix", outmatrix.name);
    gc();
}

function getRandomAngle(theDirection) {
    var a = Math.floor((randomInt(-angleCount, angleCount) + .5) * 90.0 / angleCount);
    if (theDirection == NORTH) {
        return (a - 90);
    }
    else if (theDirection == EAST) {
        return (a);
    }
    else if (theDirection == SOUTH) {
        return (a + 90);
    }
    else if (theDirection == WEST) {
        return (a + 180);
    }
    else {
        return 0;
    }
}
//-------- BEGIN GENERIC UTILITY FUNCTIONS
function getPixelVal(x, y) {
    var matrix = new JitterMatrix("lookhere"); // defined in max patch
    var val = matrix.getcell(x, y);
    return val[1];
    post(val[1]);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function keypressed(key) {}

function toRadians(angleDegrees) {
    return angleDegrees * (Math.PI / 180);
}

function toDeg(radianNum) {
    return radianNum * (180 / Math.PI);
}

function mX(x) {
    mouseX = x;
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function mY(y) {
    mouseY = y;
}

function onclick(click) {}

function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}