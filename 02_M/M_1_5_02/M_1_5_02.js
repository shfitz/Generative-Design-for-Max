include("perlin.js");
include("p5Style.js");
include("vector.js");
// set some generic vars
autowatch = 1;
var width = 600;
var height = 400;
var mouseX = 0;
var mouseY = 0;
var mouseIsPressed = false;
var mouse2IsPressed = false;
var mgraphics = new MGraphics(width, height);
var outmatrix = new JitterMatrix(4, "char", width, height);
// project specific vars
var agentsCount = 2000;
var noiseScale = 300;
var noiseStrength = 10;
var agentsAlpha = 90 / 255;
var overlayAlpha = 10 / 255;
var drawMode = 1;
var numAgents = (5000);
var strokeWidth = .3;
var agents = new Array();
for (var i = 0; i < numAgents; i++) {
    agents.push(new Agent());
}
//var arrow = "arrow.svg"; // svg stuff slows the rendering down signifigantly
post("mainFileReady");
post();
//reset();


function bang() {
    with(mgraphics) {
        set_source_rgba(1., 1., 1., overlayAlpha);
        rectangle(0, 0, width, height);
        fill();
        set_source_rgba(0., 0., 0., agentsAlpha);
        if (drawMode == 1) {
            for (var i = 0; i < agentsCount; i++) {
                agents[i].update1();
            }
        }
        else {
            for (var i = 0; i < agentsCount; i++) {
                agents[i].update2();
            }
        }
    }
    var theImage = new Image(mgraphics);
    theImage.tonamedmatrix(outmatrix.name);
    outlet(0, "jit_matrix", outmatrix.name);
    gc();
}


// class for the movers
function Agent() {
    this.p = new Vector(randomInt(0, width), randomInt(0, height), 0);
    this.pOld = new Vector(this.p.x, this.p.y);
    this.stepSize = randomInt(1, 5);
    this.angle = 0.0;
    this.isOutside = false;

    this.update1 = function () {
        this.angle = noise.simplex2(this.p.x / noiseScale, this.p.y / noiseScale) * noiseStrength;
        this.p.x += Math.cos(this.angle) * this.stepSize;
        this.p.y += Math.sin(this.angle) * this.stepSize;
        if (this.p.x < -10) this.isOutside = true;
        else if (this.p.x > width + 10) this.isOutside = true;
        else if (this.p.y < -10) this.isOutside = true;
        else if (this.p.y > height + 10) this.isOutside = true;
        if (this.isOutside) {
            this.p.x = randomInt(0, width);
            this.p.y = randomInt(0, height);
            this.pOld.set(this.p);
        }
        mgraphics.set_line_width(strokeWidth * this.stepSize);
        mgraphics.move_to(this.pOld.x, this.pOld.y);
        mgraphics.line_to(this.p.x, this.p.y);
        mgraphics.stroke();
        this.pOld.set(this.p);
        this.isOutside = false;
    }
    this.update2= function () {
        this.angle = noise.simplex2(this.p.x / noiseScale, this.p.y / noiseScale) * 24; // maybe 12?
        this.angle = (this.angle - this.angle) * noiseStrength;
        this.p.x += Math.cos(this.angle) * this.stepSize;
        this.p.y += Math.sin(this.angle) * this.stepSize;
        if (this.p.x < -10) this.isOutside = true;
        else if (this.p.x > width + 10) this.isOutside = true;
        else if (this.p.y < -10) this.isOutside = true;
        else if (this.p.y > height + 10) this.isOutside = true;
        if (this.isOutside) {
            this.p.x = randomInt(0, width);
            this.p.y = randomInt(0, height);
            this.pOld.set(this.p);
        }
        mgraphics.set_line_width(strokeWidth * this.stepSize);
        mgraphics.move_to(this.pOld.x, this.pOld.y);
        mgraphics.line_to(this.p.x, this.p.y);
        mgraphics.stroke();
        this.pOld.set(this.p);
        this.isOutside = false;
    }
};