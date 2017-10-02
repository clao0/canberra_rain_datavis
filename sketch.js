var data;

// cat image
var cat;
// image of cat chasing mouse
var catmouse;


// locations of monitoring stations
var locX;
var locY;

// names of locations
var locNames;

function preload() {
    data = loadJSON("assets/rainfall.json");
    cat = loadImage("assets/cat.png");
    cat = loadImage("assets/catmouse.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // this line is required due to a bug in the current version of p5
    // https://github.com/processing/p5.js/issues/2154
    data = Object.values(data);
    // any additional setup code goes here

    locX = [35.31, 35.28, 35.26, 35.36, 35.8];
    locY = [149.13, 149.11, 149.14, 149.07, 149.23, 149.09];
    locNames = ["Parliament House", "Botanic Gardens", "Ainslie",
  "Aranda", "Queanbeyan", "Torrens"];

}

function draw() {
    // your "draw loop" code goes here
   background("#c0eaf9");
   image(cat, mouseX, mouseY, cat.width/10, cat.height/10);
}
