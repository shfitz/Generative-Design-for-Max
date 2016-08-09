include("perlin.js");
include("p5Style.js");
// set some generic vars
autowatch = 1;
var width = 800;
var height = 800;
var mouseX = 0;
var mouseY = 0;
var mouseIsPressed = false;
var mouse2IsPressed = false;
var mgraphics = new MGraphics(width, height);
var outmatrix = new JitterMatrix(4, "char", width, height);
// project specific vars
var octaves = 4;
var falloff = 0.5;
var arcColor = [0, .5, .7, 1];
var tileSize = 40;
var gridResolutionX = Math.round(width / tileSize);
var gridResolutionY = Math.round(height / tileSize);
var debugMode = true;
//var arrow = "arrow.svg"; // svg stuff slows the rendering down signifigantly
post("mainFileReady");
post();

function bang() {
    with(mgraphics) {
        reset();
        // noiseDetail(octaves,falloff); // not gonna do this now
        var noiseXRange = mouseX / 100.;
        var noiseYRange = mouseY / 100.;
        for (var gY = 0; gY <= gridResolutionY; gY++) {
            for (var gX = 0; gX <= gridResolutionX; gX++) {
                var posX = tileSize * gX;
                var posY = tileSize * gY;
                var noiseX = map(gX, 0, gridResolutionX, 0, noiseXRange);
                var noiseY = map(gY, 0, gridResolutionY, 0, noiseYRange);
                var noiseValue = noise.simplex2(noiseX, noiseY);
                noiseValue = Math.abs(noiseValue);
                var angle = noiseValue * Math.PI * 2;
                save();
                translate(posX, posY);
                
                if (debugMode) {
                    set_source_rgba(noiseValue, noiseValue, noiseValue, 1.);
                    ellipse((tileSize * 0.25) / 2, (tileSize * 0.25) / 2, tileSize * 0.25, tileSize * 0.25);
                    fill();
                }
                set_source_rgba(arcColor);
                arc((tileSize)/ 2 - tileSize*.25, (tileSize ) / 2- tileSize*.25,tileSize*.33,0, angle);
                var thisSpot = get_current_point();
//                stroke_preserve();
//                set_source_rgba(0,0,0,1);
                

                
                move_to((tileSize)/ 2 - tileSize*.25, (tileSize ) / 2- tileSize*.25);
                line_to(thisSpot[0], thisSpot[1]);
        
                stroke();
               
             
//              move_to(10, 10);
//              rotate(angle);
               
//                stroke();
                restore();
                
            }
        }
    }
    var theImage = new Image(mgraphics);
    theImage.tonamedmatrix(outmatrix.name);
    outlet(0, "jit_matrix", outmatrix.name);
    gc();
}