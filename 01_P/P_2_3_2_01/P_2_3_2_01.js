// set some generic vars
autowatch = 1;
var width = 800;
var height = 450;
var mouseX = 0;
var mouseY = 0;
var mouseIsPressed = false;
var mgraphics = new MGraphics(width, height);
var outmatrix = new JitterMatrix(4, "char", width, height);
// project specific vars
var lineLength = 0;
var color = [Math.random(), Math.random(), Math.random(), randomInt(0, 100) / 255.]
var drawMode = 1;
var x = mouseX;
var y = mouseY;
var lineLength = 12.0;
var stepSize = 2.5;
var ticker = 0;
mgraphics.set_source_rgba(1, 1, 1, 1);
mgraphics.paint();

function bang() {
    ticker++;
    with(mgraphics) {
        if (mouseIsPressed) {
            var d = dist(x, y, mouseX, mouseY);
            if (d > stepSize) {
                var angle = Math.atan2(mouseY - y, mouseX - x);
                save();
                translate(mouseX, mouseY);
                rotate(angle);
                set_source_rgba(color);
                if (ticker % 2 == 0) {
                    set_source_rgba(0.58823529, 0.58823529, 0.58823529, 1.);
                    ticker = 0;
                }
                move_to(0, 0);
                line_to(0, lineLength * (Math.random() * (1.0 - .95) + .95) * d / 20);
                stroke();
                restore();
                if (drawMode == 1) {
                    x = x + Math.cos(angle) * stepSize;
                    y = y + Math.sin(angle) * stepSize;
                }
                else {
                    x = mouseX;
                    y = mouseY;
                }
            }
        }
    }
    var theImage = new Image(mgraphics);
    theImage.tonamedmatrix(outmatrix.name);
    outlet(0, "jit_matrix", outmatrix.name);
    gc();
}
//-------- BEGIN GENERIC UTILITY FUNCTIONS
function getPixelVal(x, y) {
    var matrix = new JitterMatrix("lookhere"); // defined in max patch
    var val = matrix.getcell(x, y);
    return val[1];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function keypressed(key) {
    if (key == "1") drawMode = 1;
    if (key == "2") drawMode = 2;
}

function toRadians(angleDegrees) {
    return angleDegrees * (Math.PI / 180);
}

function toDeg(radianNum) {
    return radianNum * (180 / Math.PI);
}

function mX(x) {
    mouseX = x;
}

function mY(y) {
    mouseY = y;
}

function dist(x1, y1, x2, y2) {
    var theVal = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    return theVal;
}

function mousePressed() {
    mouseIsPressed = true;
    x = mouseX;
    y = mouseY;
    color = [Math.random(), Math.random(), Math.random(), randomInt(0, 100) / 255.];
}

function mouseReleased() {
    mouseIsPressed = false;
}

function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}