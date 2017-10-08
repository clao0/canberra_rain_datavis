var data;

// cat image
var cat;

// image of cat chasing mouse
var catMouse;

// border image
var border;

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

// various sfx

var rainsfx;
var thundersfx;

// stores current location of the cat
var catLoc;

function preload() {
    data = loadJSON("assets/rainfall.json");
    cat = loadImage("assets/cat.png");
    catMouse = loadImage("assets/catmouse.png");
    border = loadImage("assets/border.png");
    rainsfx = loadSound("assets/rain1.mp3");
    thundersfx = loadSound("assets/thunder.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    frameRate(30);
    // this line is required due to a bug in the current version of p5
    // https://github.com/processing/p5.js/issues/2154
    data = Object.values(data);
    // any additional setup code goes here
    rowNum = 16;
    colNum = 26;
    rowWidth = windowWidth/rowNum;
    colHeight = windowHeight/colNum;

    locX = [rowWidth*7, rowWidth*4, rowWidth*2, rowWidth*2, rowWidth*12,
    rowWidth*14];

    locY = [colHeight*14, colHeight*12, colHeight*15, colHeight*8, colHeight*23,
      colHeight*10];

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

// blue blackground (192, 234, 249)
// stormy grey background (178, 184, 186)
//
  blueBackground(75, 126, 142);

  // background(0,0,0);
  // fill("#c0eaf9");
  // rect(rowWidth, colHeight*2, windowWidth-rowWidth*2, windowHeight-colHeight*4);
  // fill(0,0,0)





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

drawBorder(1,1);

}

function blueBackground(r, g, b) {
  background(r, g, b);
  for (var i = 0; i < colNum*2; i++) {
    noStroke();
    fill(r-=0.1, g-=0.9, b-=1);
    rect(0, colHeight*i/2, windowWidth, colHeight/2);
  }
  fill(0,0,0);

  // fill(0,0,0);
};


// function that allows the cat to moveCat
// i represents the co-ordinate of index of the destination in locX & locY

// TODO: make them move in the correct ratio using trignometry
// should solve the bug of never becoming the right cat
function moveCat(i) {
    if (catLoc[0] == locX[i] && catLoc[1] == locY[i]) {
      image(cat, catLoc[0], catLoc[1], cat.width/10, cat.height/10);
    } else if (catLoc[0] >= locX[i] && catLoc[1] >= locY[i]) {
       image(catMouse, catLoc[0]--, catLoc[1]--, catMouse.width/10, catMouse.height/10);
    } else if (catLoc[0] <= locX[i] && catLoc[1] >= locY[i]) {
      image(catMouse, catLoc[0]++, catLoc[1]--, catMouse.width/10, catMouse.height/10);
    } else if (catLoc[0] <= locX[i] && catLoc[1] <= locY[i]) {
      image(catMouse, catLoc[0]++, catLoc[1]++, catMouse.width/10, catMouse.height/10);
    } else if (catLoc[0] >= locX[i] && catLoc[1] <= locY[i]) {
      image(catMouse, catLoc[0]--, catLoc[1]++, catMouse.width/10, catMouse.height/10);
    }
}

// fills in ellipse on map if you click on the point
function distance(x, y) {
  for (var i = 0; i < 6; i++) {
  if (dist(x, y, locX[i], locY[i]) < 10) {
    fill("#d86a8b");
    ellipse(locX[i], locY[i], 20);
    fill(0,0,0);
    drawStormCloud(locX[i]-60, locY[i]-200, 0.5);
  }
}
}


function drawBorder(x, y) {
  for (var i = 0; i <= rowWidth*x; i++) {
    fill(0,0,0);
  }

  for (var i = 0; i <= colHeight*y; i++) {
    fill(0,0,0);
  }

}

// draws a timeline with selected years from the dataset
function drawTimeline() {
  rect();
}


// draws a sad cloud at coordinates (x, y)
function drawSadCloud(x, y, scale) {

  noStroke();
  translate(x, y);

    drawPeltingRain(70, 60+frameCount*6*60);
    drawPeltingRain(90, 50+frameCount*5%60);
    drawPeltingRain(80, 60+(frameCount*2%60));
    drawPeltingRain(60, 30+(frameCount*3%60));
    drawPeltingRain(100, 50+(frameCount*4%60));

  fill("#999da3");

  ellipse(100*scale, 100*scale, 90*scale);
  ellipse(125*scale, 50*scale, 80*scale);
  ellipse(175*scale, 50*scale, 80*scale);
  ellipse(200*scale, 90*scale, 90*scale);
  ellipse(150*scale, 110*scale, 60*scale);
  fill(0,0,0);
  ellipse(100*scale, 100*scale, 12*scale);
  ellipse(150*scale, 100*scale, 12*scale);
  fill("#a30303");
  arc(125*scale, 115*scale, 10*scale, 10*scale, PI, TWO_PI);
  fill(0, 0, 0);

  translate(-x, -y);
}

// draws lighting
function drawLighting(x, y, scale) {

  translate(x, y);
  noStroke();
  fill("#fcd167");
  triangle(-50*scale, 0*scale, -30*scale, 100*scale, 40*scale, 100*scale);
  triangle(10*scale, 100*scale, 80*scale, 100*scale, 100*scale, 200*scale);
  fill(0,0,0);
  translate(-x, -y);

}



// draws faster, pelting rain
function drawPeltingRain(x, y) {
  translate(x, y);
  fill("#000556");
  rect(0, 0, 1, 15);
  translate(-x, -y);
  fill(0,0,0);
}

// draws a cloud at coordinates (x, y)
function drawCloud(x, y, scale) {

  translate(x, y);

  drawRain(70, 60+frameCount*0.8%50);
  drawRain(90, 50+frameCount*1.2%40);
  drawRain(50, 50+frameCount*0.7%60);

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

function drawHorizontalRain(x, y) {
  translate(x, y);
  stroke("#0e3677");
  line(0,0, 5, 5);
  translate(-x, -y);

}

// draws a storm cloud at coordinates (x, y)
function drawStormCloud(x, y, scale) {
  translate(x,y);


  drawHorizontalRain(70+frameCount*6%60, 60+frameCount*6%60);
  drawHorizontalRain(90+frameCount*5%60, 50+frameCount*5%60);
  drawHorizontalRain(80+frameCount*2%60, 60+(frameCount*2%60));
  drawHorizontalRain(60+frameCount*3%60, 30+(frameCount*3%60));
  drawHorizontalRain(100+frameCount*4%60, 50+(frameCount*4%60));

      drawLighting(50+frameCount*2%50, 50+frameCount*2%60, 0.2);
      drawLighting(90+frameCount*2%50, 50+frameCount*1.5%60, 0.2);

  fill("#636262");

  ellipse(100*scale, 100*scale, 90*scale);
  ellipse(125*scale, 50*scale, 80*scale);
  ellipse(175*scale, 50*scale, 80*scale);
  ellipse(200*scale, 90*scale, 90*scale);
  ellipse(150*scale, 110*scale, 60*scale);
  fill(0,0,0);
  ellipse(100*scale, 100*scale, 12*scale);
  ellipse(150*scale, 100*scale, 12*scale);
  fill("#890101");
  arc(125*scale, 115*scale, 10*scale, 10*scale, PI, TWO_PI);
  fill(0, 0, 0);

  translate(-x,-y);

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
