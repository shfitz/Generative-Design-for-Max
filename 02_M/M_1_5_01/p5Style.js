post("p5 styles Loaded");
post();

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
    post(key);
    post();    
    if (key == 49) drawMode = 1;
    post("drawMode1");
    post();
    if (key == 50) drawMode = 2;
     post("drawMode2");
    post();  
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

function reset() {
    mgraphics.set_source_rgba(1, 1, 1, 1);
    mgraphics.paint();
}

function mousePressed() {
    mouseIsPressed = true;
    x = mouseX;
    y = mouseY;
}

function mouse2Pressed() {
    mouse2IsPressed = true;
}

function mouseReleased() {
    mouseIsPressed = false;
}

function mouse2Released() {
    mouse2IsPressed = false;
}

function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}
