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
    if (key == "49") currentShape = "01.svg";
    if (key == "50") currentShape = "02.svg";
    if (key == "51") currentShape = "03.svg";
    if (key == "52") currentShape = "04.svg";
    if (key == "53") currentShape = "05.svg";
    if (key == "54") currentShape = "06.svg";
    if (key == "55") currentShape = "07.svg";
    if (key == "56") currentShape = "08.svg";
    if (key == "57") currentShape = "09.svg";
    if (key == "30") moduleSize += 5.0;
    if (key == "31") moduleSize -= 5.0;
    if (key == "28") stepSize -= 0.5;
    if (key == "29") stepSize += 0.5;
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
