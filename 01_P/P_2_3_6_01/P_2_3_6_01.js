// set some generic vars
autowatch = 1;
var width = 800;
var height = 450;
var mouseX = 0;
var mouseY = 0;
var mouseIsPressed = false;
var mouse2IsPressed = false;

var mgraphics = new MGraphics(width, height);
var outmatrix = new JitterMatrix(4, "char", width, height);
// project specific vars
var tileSize = 30;
var gridResolutionX = Math.round(width / tileSize) + 2;
var gridResolutionY = Math.round(height / tileSize) + 2;
var doWeDrawGrid = true;
var debugMode = false;
var tiles = [];
// this creates an undefined multidiemsnional array in tiles[]
for (var i = 0; i < gridResolutionX; i++) {
    tiles[i] = [];
}
var modules = ["00.svg", "01.svg", "02.svg", "03.svg", "04.svg", "05.svg", "06.svg", "07.svg", "08.svg", "09.svg", "10.svg", "11.svg", "12.svg", "13.svg", "14.svg", "15.svg"];
initTiles();



post("ready or not, here i come");
post();

function bang() {
    with(mgraphics) {
        reset();
drawGrid();
        if (mouseIsPressed) {
            setTile();
        }
        if(mouse2IsPressed){
            unsetTile();
        }
        drawModules();
    }
    var theImage = new Image(mgraphics);
    theImage.tonamedmatrix(outmatrix.name);
    outlet(0, "jit_matrix", outmatrix.name);
    gc();
}

function initTiles() {
    for (var gridY = 0; gridY < gridResolutionY; gridY++) {
        for (var gridX = 0; gridX < gridResolutionX; gridX++) {
            tiles[gridX][gridY] = '0';
        }
    }
}

function setTile() {
    // convert mouse position to grid coordinates
    var gridX = Math.floor(mouseX / tileSize) + 1;
    gridX = Math.min(Math.max(gridX, 1), gridResolutionX - 2); // same as constrain() in p5
    var gridY = Math.floor(mouseY / tileSize) + 1;
    gridY = Math.min(Math.max(gridY, 1), gridResolutionY - 2);
    tiles[gridX][gridY] = '1';
    post(gridX + "," + gridY)
    post();
}

function unsetTile() {
    var gridX = Math.floor(mouseX / tileSize) + 1;
    gridX = Math.min(Math.max(gridX, 1), gridResolutionX - 2);
    var gridY = Math.floor(mouseY / tileSize) + 1;
    gridY = Math.min(Math.max(gridY, 1), gridResolutionY - 2);
    tiles[gridX][gridY] = '0';
}

function drawGrid() {
                for (var gridY = 0; gridY < gridResolutionY; gridY++) {
                for (var gridX = 0; gridX < gridResolutionX; gridX++) {
                    var posX = tileSize * gridX - tileSize / 2;
                    var posY = tileSize * gridY - tileSize / 2;
                    mgraphics.set_line_width(.15);
                    mgraphics.set_source_rgba(0, 0, 0, 1);
                    /*
                    if (debugMode) {
                        if (tiles[gridX][gridY] == '1') mgraphics.set_source_rgba(.8, .8, .8, 1);
                    }
                    */
                    mgraphics.rectangle(posX - tileSize / 2, posY - tileSize / 2, tileSize, tileSize);
                    mgraphics.stroke();
                }
            }
}

function drawModules() {
    for (var gridY = 1; gridY < gridResolutionY - 1; gridY++) {
        for (var gridX = 1; gridX < gridResolutionX - 1; gridX++) {
            // use only active tiles
            if (tiles[gridX][gridY] == '1') {
                // check the four neighbours, each can be 0 or 1
                var east = (tiles[gridX + 1][gridY]);
                east = east.toString();
                var south = (tiles[gridX][gridY + 1]);
                south = south.toString();
                var west = (tiles[gridX - 1][gridY]);
                west = west.toString();
                var north = (tiles[gridX][gridY - 1]);
                north = north.toString();
                // create a binary result out of it, eg. 1011
                var binaryResult = north;
                binaryResult += west;
                binaryResult += south;
                binaryResult += east;
                // convert the binary string to a decimal value from 0-15
                var decimalResult = parseInt(binaryResult, 2);
                var posX = tileSize*gridX-15;
                var posY = tileSize*gridY-15;
                // decimalResult is the also the index for the shape array
                var newxpos = posX - tileSize / 2;
                var newypos = posY - tileSize / 2;
                mgraphics.save();
                mgraphics.translate(newxpos, newypos);
                mgraphics.set_source_rgba(1,1,1,1);
            //    mgraphics.move_to(posX - tileSize / 2, posY - tileSize / 2);
                //post( newxpos+","+ newypos);
                //post();
                mgraphics.scale(.3, .3);
                mgraphics.svg_render(modules[decimalResult]);
                mgraphics.stroke();
                mgraphics.restore();
                /*
                if (debugMode) {
                    mgraphics.set_source_rgba(.4, .4, .4, 1);
                    //text(decimalResult+"\n"+binaryResult,posX, posY);
                }
                */
            }
        }
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