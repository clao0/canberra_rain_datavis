var data;

function preload() {
    data = loadJSON(/* which dataset will you choose? */);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // this line is required due to a bug in the current version of p5
    // https://github.com/processing/p5.js/issues/2154
    data = Object.values(data);
    // any additional setup code goes here
}

function draw() {
    // your "draw loop" code goes here
}
