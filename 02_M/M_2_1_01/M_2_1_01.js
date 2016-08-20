include("p5Style.js");
// set some generic vars
autowatch = 1;
var width = 800;
var height = 400;
var mouseX = 0;
var mouseY = 0;
var mouseIsPressed = false;
var mouse2IsPressed = false;
var mgraphics = new MGraphics(width, height);
var outmatrix = new JitterMatrix(4, "char", width, height);
// project specific vars
// while i'm sure i can get the LUT from 
// MSP, fuck it. I'm stuck in js now
var pointCount = 0.0;
var phi = 0.0;
var freq = 1.0;
var angle = 0.0;
var y = .0;
var doDrawAnimation = true;
var frameCount = 0;
post("main File Loaded");
post();
// reset();
function bang() {
    frameCount++;
    mgraphics.set_source_rgba(1.0, 1.0, 1.0, 1.0);
    mgraphics.rectangle(0, 0, width, height);
    mgraphics.fill();
    with(mgraphics) {
        set_source_rgba(0.0, 0.0, 0.0, 1.0);
        set_line_width(2.0);
        save();
        if (doDrawAnimation) {
            pointCount = width - 250;
            translate(250, height / 2);
        }
        else {
            pointCount = width;
            translate(0, height / 2);
        }
        for (var i = 0; i <= pointCount; i++) {
            angle = map(i, 0, pointCount, 0, 6.28);
            y = Math.sin(angle * freq + toRadians(phi));
            y = y * 100.;
            move_to(i, y);
            line_to(i+1, y+1);
            stroke();
        }
        if (doDrawAnimation) drawAnimation();
        restore();
    }
    var theImage = new Image(mgraphics);
    theImage.tonamedmatrix(outmatrix.name);
    outlet(0, "jit_matrix", outmatrix.name);
    gc();
}

function drawAnimation() {
    var t = (frameCount / pointCount) % 1;
    angle = map(t, 0, 1, 0, 6.28);
    var x = Math.cos(angle * freq + toRadians(phi));
    x = x * 100 - 125;
    y = Math.sin(angle * freq + toRadians(phi));
    y = y * 100;
    // circle
    mgraphics.set_line_width(1);
    mgraphics.ellipse(-125 - 100, -100, 200, 200);
    mgraphics.stroke();
    // lines
    mgraphics.set_source_rgba(0, 0, 0, .5);
    mgraphics.move_to(0, -100);
    mgraphics.line_to(0, 100);
    mgraphics.stroke();
    mgraphics.move_to(0, 0);
    mgraphics.line_to(pointCount, 0);
    mgraphics.stroke();
    mgraphics.move_to(-225, 0);
    mgraphics.line_to(-25, 0);
    mgraphics.stroke();
    mgraphics.move_to(-125, -100);
    mgraphics.line_to(-125, 100);
    mgraphics.stroke();
    mgraphics.move_to(x, y);
    mgraphics.line_to(-125, 0);
    mgraphics.stroke();
    mgraphics.set_source_rgba(0, 0.5, 0.7, 1.);
    mgraphics.set_line_width(2);
    mgraphics.move_to(t * pointCount, y);
    mgraphics.line_to(t * pointCount, 0);
    mgraphics.stroke();
    mgraphics.move_to(x, y);
    mgraphics.line_to(x, 0);
    mgraphics.stroke();
    var phiX = Math.cos(toRadians(phi)) * 100 - 125;
    var phiY = Math.sin(toRadians(phi)) * 100;
    // phi line
    mgraphics.set_line_width(1);
    mgraphics.set_source_rgba(0, 0, 0, .5);
    mgraphics.move_to(-125, 0);
    mgraphics.line_to(phiX, phiY);
    mgraphics.stroke();
    // phi dots
    mgraphics.set_source_rgba(0, 0, 0, 1);
    mgraphics.ellipse(0 - 4, phiY - 4, 8, 8);
    mgraphics.ellipse(phiX - 4, phiY - 4, 8, 8);
    mgraphics.ellipse(t * pointCount - 5, y - 5, 10, 10);
    mgraphics.ellipse(x - 5, y - 5, 10, 10);
    mgraphics.fill();
    mgraphics.set_source_rgba(1, 1, 1, 1);
    mgraphics.set_line_width(2);
    mgraphics.ellipse(0 - 4, phiY - 4, 8, 8);
    mgraphics.ellipse(phiX - 4, phiY - 4, 8, 8);
    mgraphics.ellipse(t * pointCount - 5, y - 5, 10, 10);
    mgraphics.ellipse(x - 5, y - 5, 10, 10);
    mgraphics.stroke();
}