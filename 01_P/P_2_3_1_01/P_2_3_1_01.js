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
var angle = 0;
var angleSpeed = 2.0;
var color = [.70, .61, .0, .39]

mgraphics.set_source_rgba(1, 1, 1, 1);
mgraphics.paint();

function bang() {
    with(mgraphics) {
        if (mouseIsPressed) {
            save();
            set_line_width(.5);
            set_source_rgba(color);
            translate(mouseX, mouseY);
            rotate(toRadians(angle));
            move_to(0, 0);
            line_to(lineLength, 0);
            stroke();
            restore();
            angle += angleSpeed;
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
    if (key == 'd') {
        angle = angle + 180;
        angleSpeed = angleSpeed * -.5;
    }
    if (key == "up") lineLength += 2.5;
    if (key == "down") lineLength -= 2.5;
    if (key == "left") angleSpeed -= 0.25;
    if (key == "right") angleSpeed += 0.25;

    if (key == "0") color = [Math.random(), Math.random(), Math.random(), randomInt(80, 150)/255.];
    if (key == "1") color = [.709, .616, .0, .39];
    if (key == "2") color = [0., .51,.64 ,.39];
    if (key == "3") color = [.34, .137, .505 ,.39];
    if (key == "4") color = [.77, 0., .48 ,.39];    
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
    lineLength = randomInt(35, 100);
}

function mouseReleased() {
    mouseIsPressed = false;
}

function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}