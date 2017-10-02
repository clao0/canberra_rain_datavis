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

// altitude of locations
var altitudes;

// sets width and height of rows/cols
var rowWidth;
var colHeight;

// number of rows and cols
var rowNum;
var colNum;

// amatic font
var amatic;

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

    locX = [rowWidth*6, rowWidth*3, rowWidth, rowWidth, rowWidth*11,
    rowWidth*13];

    locY = [colHeight*7, colHeight*5, colHeight*8, colHeight, colHeight*17,
      colHeight*3];

    locNames = ["Parliament House", "Botanic Gardens", "Ainslie",
  "Aranda", "Queanbeyan", "Torrens"];

    altitudes = [585, 585, 585, 630, 580, 653];

    catMoving = false;

    amatic = loadFont("assets/AmaticSC-Regular.ttf");

}

function draw() {
    // your "draw loop" code goes here
   background("#c0eaf9");
   for (var i = 0; i < 6; i++) {
   if (dist(mouseX, mouseY, locX[i], locY[i]) < 10) {
     image(catMouse, mouseX, mouseY, catMouse.width/10, catMouse.height/10);
   } else {
   image(cat, windowWidth/2, windowHeight/2, cat.width/10, cat.height/10);
}
}
// how to make cat move towards the point?
// clarify with tutor


// draws locations
   for (var i = 0; i < 6; i++) {
     ellipse(locX[i], locY[i], 20);
     text(locNames[i], locX[i], locY[i]-40);
     text("Elevation:"+altitudes[i]+" m", locX[i], locY[i]-20);
     textFont(amatic, 20);
   }

// highlights location if clicked
   distance(mouseX, mouseY);

}

// fills in ellipse on map if you click on the point
function distance(x, y) {
  for (var i = 0; i < 6; i++) {
  if (dist(x, y, locX[i], locY[i]) < 10) {
    fill("#d86a8b");
    ellipse(locX[i], locY[i], 20);
    fill(0,0,0);
    drawCloud(locX[i]-60, locY[i]-200, 0.5);
  }
}
}

// draws a cloud at coordinates (x, y)
function drawCloud(x, y, scale) {

  noStroke();
  translate(x, y);

  drawRain(80, 60+(frameCount*0.5%60));
  drawRain(60, 30+(frameCount%60));
  drawRain(100, 50+(frameCount*1.2%60));

  fill("#ffffff");

  ellipse(100*scale, 100*scale, 90*scale);
  ellipse(125*scale, 50*scale, 80*scale);
  ellipse(175*scale, 50*scale, 80*scale);
  ellipse(200*scale, 90*scale, 90*scale);
  ellipse(150*scale, 110*scale, 60*scale);
  fill(0,0,0);
  ellipse(100*scale, 100*scale, 12*scale);
  ellipse(150*scale, 100*scale, 12*scale);
  fill("#d86a8b");
  arc(125*scale, 115*scale, 10*scale, 10*scale, PI, TWO_PI);
  fill(0, 0, 0);

  translate(-x, -y);
}

// draws rain at coordinate(x, y)
function drawRain(x, y) {
  fill("#5385d6");
  ellipse(x, y, 10);
  triangle(x-5, y, x, y-10, x+5, y);
  fill(0,0,0);
}
