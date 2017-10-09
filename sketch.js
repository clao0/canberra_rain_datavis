var data;

// cat image
var cat;

// image of cat chasing mouse
var catMouse;

// border image
var border;

// clock image
var clock;

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

// rainfalls for various years
var rainfall1990;
var rainfall2009;
var rainfall2014;

// keeps track of what year is selected
var year1990;
var year2009;
var year2014;

// various sfx
var birdsfx;
var rainsfx;
var thundersfx;

// keeps track of backgrounds
var backgroundRain;
var backgroundPelting;
var backgroundStorm;

// keeps track of when locations have been clicked
var parliament;
var ainslie;
var aranda;
var torrens;
var botanic;
var queanbeyan;

// keeps track of the latest station
var currentStation;

// ranks the locations by rainfall (most to least)
var locRank1990;
var lockRank2009;
var lockRank2014;

// stores current location of the cat
var catLoc;

function preload() {
    data = loadJSON("assets/rainfall.json");
    cat = loadImage("assets/cat.png");
    catMouse = loadImage("assets/catmouse.png");
    border = loadImage("assets/border.png");
    clock = loadImage("assets/clock.png");
    rainsfx = loadSound("assets/rain1.mp3");
    thundersfx = loadSound("assets/thunder.mp3");
    birdsfx = loadSound("assets/birdrain.mp3");
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
    colHeight = (windowHeight-120)/colNum;

    locX = [rowWidth*7, rowWidth*4, rowWidth*2, rowWidth*2, rowWidth*12,
    rowWidth*14];

    locY = [colHeight*8+120, colHeight*6+120, colHeight*9+120, colHeight*2+120,
      colHeight*17+120,colHeight*4+120];

    locNames = ["Parliament House", "Botanic Gardens", "Ainslie",
  "Aranda", "Queanbeyan", "Torrens"];

  year1990 = false;
  year2009 = false;
  year2014 = true;

  parliament = false;
  aranda = false;
  ainslie = false;
  botanic = false;
  torrens = false;
  queanbeyan = false;

  backgroundRain = false;
  backgroundPelting = false;
  backgroundStorm = false;

// if rain is from 40-46, normal rain cloud
// if rain is from 47-54, sad rain cloud
// if rain is from 55-60, storm rain cloud


// ranks rainfall from largest to smallest

   locRank1990 = [5, 1, 3, 2, 6, 4];
   locRank2009 = [3, 1, 2, 4, 5, 6];
   locRank2014 = [6, 5, 3, 2, 4, 1];

   rainfall1990 = [53.06, 59.88, 56.13, 57.53, 45.67, 54.82];
   rainfall2009 = [40.55, 44.38, 43.21, 40.45, 40.12, 40.6];
   rainfall2014 = [40.55, 45.05, 52.83, 57.53, 48.12, 60.9];

    altitudes = [585, 585, 585, 630, 580, 653];

    catMoving = false;

    amatic = loadFont("assets/AmaticSC-Regular.ttf");

    catLoc = [windowWidth/2, windowHeight/2];
}

function draw() {
    // your "draw loop" code goes here

      changeYears();

      if (backgroundRain) {
        backgroundBlend(192, 234, 249);
        thundersfx.stop();
        rainsfx.stop();
        if (birdsfx.isPlaying() == false) {
            birdsfx.play();
        }
      } else if (backgroundPelting) {
        backgroundBlend(178, 184, 186);
        thundersfx.stop();
        birdsfx.stop();
        if (rainsfx.isPlaying() == false) {
            rainsfx.play();
        }
      } else if (backgroundStorm) {
         backgroundBlend(75, 126, 142);
         rainsfx.stop();
         birdsfx.stop();
         if (thundersfx.isPlaying() == false) {
            thundersfx.play();
         }
      } else {
         background("#676a6d");
      }

      for (var i = 0; i <= colNum; i++) {
        noStroke();
        fill("#bcd3d8");
        ellipse(i*rowWidth, 10, 120);
      }

drawYears();

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
   image(cat, catLoc[0], catLoc[1], cat.width/15, cat.height/15);
}

// draws locations
   for (var i = 0; i < 6; i++) {
     textFont(amatic, 20);
     ellipse(locX[i], locY[i], 20);
     text(locNames[i], locX[i], locY[i]-40);
     text("Elevation:"+altitudes[i]+" m", locX[i], locY[i]-20);
   }

distance(mouseX, mouseY);

startClouds();

}

function drawYears() {
if (year1990) {
  fill("#3599b7");
   textFont(amatic, 40);
  image(border, windowWidth/4-25, 5, 60, 50);
  text("1990", windowWidth/4-20, 40);
  fill(0,0,0);
   image(border, windowWidth/2-25, 5, 60, 50);
  text("2009", windowWidth/2-20, 40);
   image(border, windowWidth*3/4-25, 5, 60, 50);
  text("2014", windowWidth*3/4-20, 40);
} else if (year2009) {
  fill(0,0,0);
   textFont(amatic, 40);
  image(border, windowWidth/4-25, 5, 60, 50);
  text("1990", windowWidth/4-20, 40);
  fill("#3599b7");
   image(border, windowWidth/2-25, 5, 60, 50);
  text("2009", windowWidth/2-20, 40);
  fill(0,0,0);
   image(border, windowWidth*3/4-25, 5, 60, 50);
  text("2014", windowWidth*3/4-20, 40);
} else {
  fill(0,0,0);
   textFont(amatic, 40);
  image(border, windowWidth/4-25, 5, 60, 50);
  text("1990", windowWidth/4-20, 40);
   image(border, windowWidth/2-25, 5, 60, 50);
  text("2009", windowWidth/2-20, 40);
   image(border, windowWidth*3/4-25, 5, 60, 50);
   fill("#3599b7");
  text("2014", windowWidth*3/4-20, 40);
  fill(0,0,0);
}
}

function changeYears() {
  if (mouseX >= windowWidth/4-25 && mouseX <= windowWidth/4+35
  && mouseY >= 5 && mouseY <= 55) {
    year1990 = true;
    year2009 = false;
    year2014 = false;
    reset();
  } else if (mouseX >= windowWidth/2-25 && mouseX <= windowWidth/2+35
  && mouseY >= 5 && mouseY <= 55) {
    year1990 = false;
    year2009 = true;
    year2014 = false;
    reset();
  } else if (mouseX >= windowWidth*3/4-25 && mouseX <= windowWidth*3/4+35
  && mouseY >= 5 && mouseY <= 55) {
    year1990 = false;
    year2009 = false;
    year2014 = true;
    reset();
  }

}

// resets to default state
function reset() {
  rainsfx.stop();
  thundersfx.stop();
  birdsfx.stop();
  backgroundRain = false;
  backgroundPelting = false;
  backgroundStorm = false;
  parliament = false;
  botanic = false;
  ainslie = false;
  queanbeyan = false;
  aranda = false;
  torrens = false;
}

function backgroundBlend(r, g, b) {
  background(r, g, b);
  for (var i = 0; i < colNum*2; i++) {
    noStroke();
    fill(r-=0.2, g-=1.8, b-=2);
    rect(0, colHeight*i/2+120, windowWidth, colHeight/2);

  }

  for (var i = 0; i <= colNum; i++) {
    noStroke();
    fill("#ffffff");
    ellipse(i*rowWidth, 10, 120);
  }

  fill(0,0,0);
}


// function that allows the cat to moveCat
// i represents the co-ordinate of index of the destination in locX & locY

// TODO: make them move in the correct ratio using trignometry
// should solve the bug of never becoming the right cat
function moveCat(i) {
  var distX = Math.abs(locX[i] - catLoc[0]);
  var distY = Math.abs(locY[i] - catLoc[1]);
  var ratio;
  if (distX > distY) {
    ratio = distY/distX;
  } else {
    ratio = distX/distY;
  }

    if (catLoc[0] == locX[i] && catLoc[1] == locY[i]) {
      image(cat, catLoc[0], catLoc[1], cat.width/15, cat.height/15);
    } else if (catLoc[0] >= locX[i] && catLoc[1] >= locY[i]) {
       image(catMouse, catLoc[0]--, catLoc[1]-=(1*ratio), catMouse.width/15, catMouse.height/15);
    } else if (catLoc[0] <= locX[i] && catLoc[1] >= locY[i]) {
      image(catMouse, catLoc[0]++, catLoc[1]-=(1*ratio), catMouse.width/15, catMouse.height/15);
    } else if (catLoc[0] <= locX[i] && catLoc[1] <= locY[i]) {
      image(catMouse, catLoc[0]++, catLoc[1]+=(1+ratio), catMouse.width/15, catMouse.height/15);
    } else if (catLoc[0] >= locX[i] && catLoc[1] <= locY[i]) {
      image(catMouse, catLoc[0]--, catLoc[1]+=(1*ratio), catMouse.width/15, catMouse.height/15);
    }
}

// fills in ellipse on map if you click on the point
function distance(x, y) {

if (dist(x, y, locX[0], locY[0]) < 10) {
  parliament = true;
  currentStation = "parliament";
} else if (dist(x, y, locX[1], locY[1]) < 10) {
   botanic = true;
   currentStation = "botanic";
} else if (dist(x, y, locX[2], locY[2]) < 10) {
   ainslie = true;
   currentStation = "ainslie";
} else if (dist(x, y, locX[3], locY[3]) < 10) {
   aranda = true;
   currentStation = "aranda";
} else if (dist(x, y, locX[4], locY[4]) < 10) {
   queanbeyan = true;
   currentStation = "queanbeyan";
} else if (dist(x, y, locX[5], locY[5]) < 10) {
   torrens = true;
   currentStation = "torrens";
}
}

// starts drawing clouds at correct location
function startClouds() {
  if (parliament) {
    drawBackground(currentStation);
    drawStuff(0);
  }

  if (botanic) {
    drawBackground(currentStation);
    drawStuff(1);
  }

  if (ainslie) {
    drawBackground(currentStation);
    drawStuff(2);
  }

  if (aranda) {
    drawBackground(currentStation);
    drawStuff(3);
  }

  if (queanbeyan) {
    drawBackground(currentStation);
    drawStuff(4);
  }

  if (torrens) {
    drawBackground(currentStation);
    drawStuff(5);
  }
}

function drawCloudNum(n, i, type) {
  if (type == "rain") {
  if (n == 6) {
    drawCloud(locX[i]-50, locY[i] - 240, 0.8);
  } else if (n == 5) {
    drawCloud(locX[i]-50, locY[i] - 220, 0.7);
  } else if (n == 4) {
    drawCloud(locX[i]-50*(0.4/0.5), locY[i] - 200, 0.6);
  } else if (n == 3) {
    drawCloud(locX[i]-50*(0.3/0.5), locY[i] - 170, 0.5);
  } else if (n == 2) {
    drawCloud(locX[i]-50*(0.2/0.5), locY[i] - 150, 0.4);
  } else {
    drawCloud(locX[i]-50*(0.1/0.5), locY[i] - 130, 0.3);
  }
} else if (type == "pelting") {
  if (n == 6) {
    drawSadCloud(locX[i]-50, locY[i] - 240, 0.8);
  } else if (n == 5) {
    drawSadCloud(locX[i]-50, locY[i] - 220, 0.7);
  } else if (n == 4) {
    drawSadCloud(locX[i]-50*(0.4/0.5), locY[i] - 200, 0.6);
  } else if (n == 3) {
    drawSadCloud(locX[i]-50*(0.3/0.5), locY[i] - 170, 0.5);
  } else if (n == 2) {
    drawSadCloud(locX[i]-50*(0.2/0.5), locY[i] - 150, 0.4);
  } else {
    drawSadCloud(locX[i]-50*(0.1/0.5), locY[i] - 130, 0.3);
  }
} else if (type == "storm") {
  if (n == 6) {
    drawStormCloud(locX[i]-50, locY[i] - 240, 0.8);
  } else if (n == 5) {
    drawStormCloud(locX[i]-50, locY[i] - 220, 0.7);
  } else if (n == 4) {
    drawStormCloud(locX[i]-50*(0.4/0.5), locY[i] - 200, 0.6);
  } else if (n == 3) {
    drawStormCloud(locX[i]-50*(0.3/0.5), locY[i] - 170, 0.5);
  } else if (n == 2) {
    drawStormCloud(locX[i]-50*(0.2/0.5), locY[i] - 150, 0.4);
  } else {
    drawStormCloud(locX[i]-50*(0.1/0.5), locY[i] - 130, 0.3);
  }
}
}

function drawStuff(i) {
  if (year1990) {
      if (rainfall1990[i] < 47) {
        drawCloudNum(locRank1990[i], i, "rain");
      } else if (rainfall1990[i] < 54) {
        drawCloudNum(locRank1990[i], i, "pelting");
      } else {
        drawCloudNum(locRank1990[i], i, "storm");
        }
      } else if (year2009) {
      if (rainfall2009[i] < 47) {
        drawCloudNum(locRank2009[i], i, "rain");
      } else if (rainfall2009[i] < 54) {
        drawCloudNum(locRank2009[i], i, "pelting");
      } else {
        drawCloudNum(locRank2009[i], i, "storm");
      }
    } else {
      if (rainfall2014[i] < 47) {
        drawCloudNum(locRank2014[i], i, "rain");
      } else if (rainfall2014[i] < 54) {
        drawCloudNum(locRank2014[i], i, "pelting");
      } else {
        drawCloudNum(locRank2014[i], i, "storm");
      }


      // locNames = ["Parliament House", "Botanic Gardens", "Ainslie",
      // "Aranda", "Queanbeyan", "Torrens"];
      // rainfall2014 = [40.55, 45.05, 52.83, 57.53, 48.12, 60.9];
}
}

function setRain() {
  backgroundPelting = false;
  backgroundStorm = false;
  backgroundRain = true;
}

function setPelting() {
  backgroundRain = false;
  backgroundStorm = false;
  backgroundPelting = true;
}

function setStorm() {
  backgroundRain = false;
  backgroundPelting = false;
  backgroundStorm = true;
}

function backgroundHelp(i) {
  if (year1990) {
  if (rainfall1990[i] < 47) {
    setRain();
  } else if (rainfall1990[i] < 54) {
    setPelting();
  } else {
    setStorm();
  }
} else if (year2009) {
  if (rainfall2009[i] < 47) {
    setRain();
  } else if (rainfall2009[i] < 54) {
    setPelting();
  } else {
    setStorm();
  }
} else {
  if (rainfall2014[i] < 47) {
    setRain();
  } else if (rainfall2014[i] < 54) {
    setPelting();
  } else {
    setStorm();
  }
}
}

function drawBackground(currentStation) {
  if (currentStation == "parliament") {
      backgroundHelp(0);
} else if (currentStation == "botanic") {
    backgroundHelp(1);
} else if (currentStation == "ainslie") {
    backgroundHelp(2);
} else if (currentStation == "aranda") {
    backgroundHelp(3);
} else if (currentStation == "queanbeyan") {
    backgroundHelp(4);
} else if (currentStation == "torrens") {
   backgroundHelp(5);
}
}

// draws a sad cloud at coordinates (x, y)
function drawSadCloud(x, y, scale) {

  noStroke();
  translate(x, y);

    drawPeltingRain(70*(scale/0.5), (60*(scale/0.5)+frameCount*6*60), scale);
    drawPeltingRain(90*(scale/0.5), (50*(scale/0.5)+frameCount*5%60), scale);
    drawPeltingRain(80*(scale/0.5), (60*(scale/0.5)+frameCount*2%60), scale);
    drawPeltingRain(60*(scale/0.5), (30*(scale/0.5)+frameCount*3%60), scale);
    drawPeltingRain(100*(scale/0.5), (50*(scale/0.5)+frameCount*4%60), scale);

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
function drawPeltingRain(x, y, scale) {
  translate(x, y);
  fill("#000556");
  rect(0, 0, 1*scale, 15*scale);
  translate(-x, -y);
  fill(0,0,0);
}

// draws a cloud at coordinates (x, y)
function drawCloud(x, y, scale) {

  translate(x, y);

  drawRain(70, 60+frameCount*0.8%50, scale/0.5);
  drawRain(90, 50+frameCount*1.2%40, scale/0.5);
  drawRain(50, 50+frameCount*0.7%60, scale/0.5);

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

function drawHorizontalRain(x, y, scale) {
  translate(x, y);
  stroke("#0e3677");
  line(0,0, 5*scale, 5*scale);
  translate(-x, -y);

}

// draws a storm cloud at coordinates (x, y)
function drawStormCloud(x, y, scale) {
  translate(x,y);


  drawHorizontalRain(70+frameCount*6%60, 60+frameCount*6%60, scale);
  drawHorizontalRain(90+frameCount*5%60, 50+frameCount*5%60, scale);
  drawHorizontalRain(80+frameCount*2%60, 60+(frameCount*2%60), scale);
  drawHorizontalRain(60+frameCount*3%60, 30+(frameCount*3%60), scale);
  drawHorizontalRain(100+frameCount*4%60, 50+(frameCount*4%60), scale);

      drawLighting(50+frameCount*2%50, 50+frameCount*2%60, 0.2*(scale/0.5));
      drawLighting(90+frameCount*2%50, 50+frameCount*1.5%60, 0.2*(scale/0.5));

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
function drawRain(x, y, scale) {
  fill("#5385d6");
  ellipse(x*scale, y*scale, 10*scale);
  triangle(x*scale-5*scale, y*scale, x*scale, y*scale-10*scale, x*scale+5*scale, y*scale);
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
