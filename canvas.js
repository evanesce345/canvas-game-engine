import Ufo from "./ufo.js";

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.height = 500;
canvas.width = 800;

var ufo = new Ufo(c, canvas.width / 2, canvas.height / 4, 1);

// Game Loop
function mainLoop() {
  update();
  draw();

  requestAnimationFrame(mainLoop);
}

function update() {
  ufo.update();
}

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  ufo.draw();
  c.restore();
}

mainLoop();
