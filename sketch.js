var data;

// cat image
var cat;
// image of cat chasing mouse
var catMouse;

// boolean used to alternate between cat images
var catMoving;

// locations of monitoring stations
var locX;
var locY;

// names of locations
var locNames;

// sets width and height of rows/cols
var rowWidth;
var colHeight;

// number of rows and cols
var rowNum;
var colNum;

function preload() {
    data = loadJSON("assets/rainfall.json");
    cat = loadImage("assets/cat.png");
    catMouse = loadImage("assets/catmouse.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // this line is required due to a bug in the current version of p5
    // https://github.com/processing/p5.js/issues/2154
    data = Object.values(data);
    // any additional setup code goes here
    rowNum = 14;
    colNum = 18;
    rowWidth = windowWidth/rowNum;
    colHeight = windowHeight/colNum;



    //arr - 35.26, ain - 35.26, bg - 35.28, ph - 35.31, q - 35.36, t - 35.38
    //arr - 7, t - 9, bg - 11, ph - 13, ain - 14, q, 23

    locX = [rowWidth*6, rowWidth*3, rowWidth, rowWidth, rowWidth*11,
    rowWidth*13];

    locY = [colHeight*7, colHeight*5, colHeight*8, colHeight, colHeight*17,
      colHeight*3];
    locNames = ["Parliament House", "Botanic Gardens", "Ainslie",
  "Aranda", "Queanbeyan", "Torrens"];
    catMoving = false;

}

function draw() {
    // your "draw loop" code goes here
   background("#c0eaf9");
   image(cat, mouseX, mouseY, cat.width/10, cat.height/10);

   for (var i = 0; i < 6; i++) {
     ellipse(locX[i], locY[i], 20);
   }
}
