// set some generic vars
autowatch = 1;
var width = 800;
var height = 800;
var mouseX = 0;
var mouseY = 0;
var mgraphics = new MGraphics(width, height);
var outmatrix = new JitterMatrix(4, "char", width, height);
//mgraphics.relative_coords = 0; // not needed when matrixing?
// project specific vars
var currentCount = 1;
var maxCount = 5000;
var x = new Array(maxCount);
var y = new Array(maxCount);
var r = new Array(maxCount);
var closestIndex = new Array(maxCount);
var minRad = 3.;
var maxRad = 50.;
var mouseRect = 30;
x[0] = 200;
y[0] = 100;
r[0] = 50;
closestIndex[0] = 0;

function bang() {
    with(mgraphics) {
        set_source_rgba(1, 1, 1, 1);
        paint();
        set_line_width(.5);
        var newR = Math.random() * minRad;
        var newX = Math.random() * (maxRad - (width - maxRad)) + (width - maxRad);
        var newY = Math.random() * (maxRad - (height - maxRad)) + (height - maxRad);
        var intersection = false;
        for (var i = 0; i < currentCount; i++) {
            var d = dist(newX, newY, x[i], y[i]);
            if (d < (newR + r[i])) {
                intersection = true;
                break;
            }
        }
        //if no intersection, add circle
        if (intersection == false) {
            // get closest neighbour and closest possible radius
            var newRadius = width;
            for (var i = 0; i < currentCount; i++) {
                var d = dist(newX, newY, x[i], y[i]);
                if (newRadius > d - r[i]) {
                    newRadius = d - r[i];
                    closestIndex[currentCount] = i;
                }
            }
            if (newRadius > maxRad) {
                newRadius = maxRad;
            }
            x[currentCount] = newX;
            y[currentCount] = newY;
            r[currentCount] = newRadius;
            currentCount++;
        }
        for (var i = 0; i < currentCount; i++) {
            set_source_rgba(0, 0, 0, 1);
            set_line_width(1.5);
            ellipse(x[i] - r[i], y[i] - r[i], r[i] * 2, r[i] * 2);
            stroke();
            set_source_rgba(.8, .3, .6, 1);
            set_line_width(0.75);
            var n = closestIndex[i];
            move_to(x[i], y[i]);
            line_to(x[n], y[n]);
            stroke();
        }
        var theImage = new Image(mgraphics);
        theImage.tonamedmatrix(outmatrix.name);
        outlet(0, "jit_matrix", outmatrix.name);
        gc();
    }
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
    var theVal = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    return theVal;
}

function mY(y) {
    mouseY = y;
}

function onclick(click) {}

function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}