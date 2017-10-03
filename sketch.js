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

// counts time in a recursive manner
var time;

// starting position of the cat
var startPos;

// paths to destinations
var path0;
var path1;
var path3;
var path4;
var path5;

// counts the distance moved towards each location
var pCount0;
var pCount1;
var pCount2;
var pCount3;
var pCount4;
var pCount5;

// stores current location of the cat
var catLoc;

function preload() {
    data = loadJSON("assets/rainfall.json");
    cat = loadImage("assets/cat.png");
    catMouse = loadImage("assets/catmouse.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    frameRate(30);
    // this line is required due to a bug in the current version of p5
    // https://github.com/processing/p5.js/issues/2154
    data = Object.values(data);
    // any additional setup code goes here
    rowNum = 16;
    colNum = 18;
    rowWidth = windowWidth/rowNum;
    colHeight = windowHeight/colNum;

    locX = [rowWidth*7, rowWidth*4, rowWidth*2, rowWidth*2, rowWidth*12,
    rowWidth*14];

    locY = [colHeight*8, colHeight*6, colHeight*9, colHeight*2, colHeight*17,
      colHeight*4];

      // need to create more space
      // don't want clouds to overshadow stuff

    locNames = ["Parliament House", "Botanic Gardens", "Ainslie",
  "Aranda", "Queanbeyan", "Torrens"];

    altitudes = [585, 585, 585, 630, 580, 653];

    catMoving = false;

    amatic = loadFont("assets/AmaticSC-Regular.ttf");

    catLoc = [windowWidth/2, windowHeight/2];

}

function draw() {
    // your "draw loop" code goes here

    // for blended backgrounds, rects, slightly different colours
   background("#c0eaf9");

// why don't you have an array that stores the location of the cat instead?
// needs to account for things like other arrays and all that jazz



if (dist(mouseX, mouseY, locX[0], locY[0]) < 10) {
    moveCat(0);
} else if (dist(mouseX, mouseY, locX[1], locY[1]) < 10) {
    moveCat(1);
}  else if (dist(mouseX, mouseY, locX[2], locY[2]) < 10) {
    moveCat(2);
}  else if (dist(mouseX, mouseY, locX[3], locY[3]) < 10) {
    moveCat(3);
}  else if (dist(mouseX, mouseY, locX[4], locY[4]) < 10) {
    moveCat(4);
}  else if (dist(mouseX, mouseY, locX[5], locY[5]) < 10) {
    moveCat(5);
} else {
   image(cat, catLoc[0], catLoc[1], cat.width/10, cat.height/10);
}

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

// function that allows the cat to moveCat
// i represents the co-ordinate of index of the destination in locX & locY
function moveCat(i) {
    if (catLoc[0] > locX[i] && catLoc[1] > locY[i]) {
       image(catMouse, catLoc[0]--, catLoc[1]--, catMouse.width/10, catMouse.height/10);
    } else if (catLoc[0] < locX[i] && catLoc[1] > locY[i]) {
      image(catMouse, catLoc[0]++, catLoc[1]--, catMouse.width/10, catMouse.height/10);
    } else if (catLoc[0] < locX[i] && catLoc[1] < locY[i]) {
      image(catMouse, catLoc[0]++, catLoc[1]++, catMouse.width/10, catMouse.height/10);
    } else if (catLoc[0] > locX[i] && catLoc[1] < locY[i]) {
      image(catMouse, catLoc[0]--, catLoc[1]++, catMouse.width/10, catMouse.height/10);
    } else {
      image(cat, catLoc[0], catLoc[1], cat.width/10, cat.height/10);
    }
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

// change clouds
// make cat walk
// add sfx
// make the cloud stay when clicked
// make sky change colour
// add pictures of parliament etc.
// draw a path where the cat goes
// make rain in different directions
// select 5 years or something
