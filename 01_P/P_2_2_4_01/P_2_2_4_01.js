// set some generic vars
autowatch = 1;
var width = 600;
var height = 600;
var mouseX = 0;
var mouseY = 0;
var mgraphics = new MGraphics(width, height);
var outmatrix = new JitterMatrix(4, "char", width, height);
//mgraphics.relative_coords = 0; // not needed when matrixing?
// project specific vars
var currentCount =1;
var maxCount = 5000;

var x=new Array(maxCount);
var y=new Array(maxCount);
var r=new Array(maxCount);

x[0]=width/2.;
y[0]=height/2.;
r[0]=10.;

function bang() {
    with(mgraphics) {
        set_source_rgba(1, 1, 1, 1);
        paint();
        
        set_line_width(.5);
        
        var newR = Math.random()*(7 - 1) + 1;
        var newX = Math.random()*(width-newR-newR) + newR;
        var newY = Math.random()*(height-newR-newR) + newR;
        
        var closestDist = 100000000000;
        var closestIndex = 0;
        
        for(var i=0;i<currentCount;i++){
            var newDist = dist(newX, newY, x[i], y[i]);
            if(newDist<closestDist){
                closestDist = newDist;
                closestIndex = i;
            }
        }
        
        //show random pos + like
        // for later
     //   set_source_rgba(.7, .7, .7, 1.);
    //    ellipse(newX, newY, newR*2, newR*2);
        
        var angle = Math.atan2(newY-y[closestIndex], newX-x[closestIndex]);
        
        x[currentCount] = x[closestIndex] + Math.cos(angle) * (r[closestIndex]+newR);
        y[currentCount] = y[closestIndex] + Math.sin(angle) * (r[closestIndex]+newR);
        r[currentCount] = newR;
        currentCount++;
        
        for (var i=0 ; i < currentCount; i++) {
            set_source_rgba(.3, .3, .3, .3);
            ellipse(x[i]-r[i],y[i]-r[i], r[i]*2,r[i]*2); 
            fill();
            set_source_rgba(.5, .5, .5, .9);
            ellipse(x[i]-r[i],y[i]-r[i], r[i]*2,r[i]*2); 
            stroke();
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
    var theVal =Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    return theVal;
}

function mY(y) {
    mouseY = y;
}

function onclick(click) {}

function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}