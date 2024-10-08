export default function Ufo(context, x, y, dx) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.c = context;

  this.bodyColor = "#ced3d4";

  // Ideally the tractor beam would be its own class to make this more readable
  this.beamLeftX = -300;
  this.beamRightX = 300;
  this.beamLeftX_velocity = 1;
  this.beamRightX_velocity = 1;

  // Same with these lights
  this.lightSize = 5;
  this.lightScaling = 3;

  // And the legs
  this.leftLegRot = (30 * Math.PI) / 180;
  this.rightLegRot = (-30 * Math.PI) / 180;
  this.leftRotSpeed = (0.1 * Math.PI) / 180;
  this.rightRotSpeed = (-0.1 * Math.PI) / 180;
}

Ufo.prototype.drawBody = function () {
  this.c.beginPath();
  this.c.ellipse(0, 0, 80, 30, 0, 0, 2 * Math.PI);
  this.c.strokeStyle = "black";
  this.c.stroke();
  this.c.fillStyle = this.bodyColor;
  this.c.fill();
};

Ufo.prototype.drawHead = function () {
  this.c.beginPath();
  this.c.arc(0, 0, 50, 0, Math.PI, true);
  this.c.stroke();
  this.c.fillStyle = "rgba(166, 255, 236)";
  this.c.fill();
};

Ufo.prototype.drawLegs = function () {
  // Right leg
  this.c.save();
  this.c.translate(50, 24);
  this.c.rotate(this.rightLegRot);
  this.c.fillStyle = this.bodyColor;
  this.c.strokeRect(0, 0, 5, 30);
  this.c.fillRect(0, 0, 5, 30);

  // Right leg ball
  this.c.beginPath();
  this.c.translate(2.5, 30);
  this.c.arc(0, 0, 6, 0, 2 * Math.PI);
  this.c.stroke();
  this.c.fill();

  // Left leg
  this.c.restore();
  this.c.save();
  this.c.translate(-55, 22);
  this.c.rotate(this.leftLegRot);
  this.c.fillStyle = this.bodyColor;
  this.c.strokeRect(0, 0, 5, 30);
  this.c.fillRect(0, 0, 5, 30);

  // Left leg ball
  this.c.beginPath();
  this.c.translate(2.5, 30);
  this.c.arc(0, 0, 6, 0, 2 * Math.PI);
  this.c.stroke();
  this.c.fill();

  this.c.restore();
};

Ufo.prototype.drawLights = function () {
  // Left light
  this.c.save();
  this.c.translate(-40, 8);
  this.c.beginPath();
  this.c.arc(0, 0, this.lightSize, 0, 2 * Math.PI);
  this.c.fillStyle = "#ffd242";
  this.c.fill();
  this.c.restore();

  // Middle light
  this.c.save();
  this.c.translate(0, 8);
  this.c.beginPath();
  this.c.arc(0, 0, this.lightSize, 0, 2 * Math.PI);
  this.c.fillStyle = "#ffd242";
  this.c.fill();
  this.c.restore();

  // Right Light
  this.c.save();
  this.c.translate(40, 8);
  this.c.beginPath();
  this.c.arc(0, 0, this.lightSize, 0, 2 * Math.PI);
  this.c.fillStyle = "#ffd242";
  this.c.fill();
  this.c.restore();
};

Ufo.prototype.drawBeam = function () {
  this.c.beginPath();
  this.c.moveTo(0, 0);

  this.c.lineTo(this.beamLeftX, this.c.canvas.clientHeight);
  this.c.lineTo(this.beamRightX, this.c.canvas.clientHeight);
  this.c.lineTo(0, 0);

  this.c.fillStyle = "rgba(166, 255, 252, 0.3)";
  this.c.fill();
  this.c.strokeStyle = "#38caff";
  this.c.stroke();
};

Ufo.prototype.update = function () {
  // Update body position
  if (this.x - 80 < 0 || this.x + 80 > this.c.canvas.clientWidth) {
    this.dx = -this.dx;
  }

  this.x += this.dx;

  // Update tractor beam position
  if (this.beamLeftX > -100 || this.beamLeftX < -300) {
    this.beamLeftX_velocity = -this.beamLeftX_velocity;
  }
  if (this.beamRightX < 100 || this.beamRightX > 300) {
    this.beamRightX_velocity = -this.beamRightX_velocity;
  }

  this.beamLeftX += this.beamLeftX_velocity;
  this.beamRightX += this.beamRightX_velocity;

  // Update lights
  if (this.lightSize < 5 || this.lightSize > 8) {
    this.lightScaling = -this.lightScaling;
  }

  this.lightSize += this.lightScaling;

  // Update legs
  var legLimit = (40 * Math.PI) / 180;
  var legLimit2 = (20 * Math.PI) / 180;

  if (this.leftLegRot > legLimit || this.leftLegRot < legLimit2) {
    this.leftRotSpeed = -this.leftRotSpeed;
  }
  if (this.rightLegRot < -legLimit || this.rightLegRot > -legLimit2) {
    this.rightRotSpeed = -this.rightRotSpeed;
  }

  this.rightLegRot += this.rightRotSpeed;
  this.leftLegRot += this.leftRotSpeed;
};

Ufo.prototype.draw = function () {
  this.c.save();
  this.c.translate(this.x, this.y);

  // Draw tractor beam
  this.drawBeam();

  // Draw body
  this.drawBody();
  this.c.save();

  // Draw head
  this.c.translate(0, -10);
  this.drawHead();
  this.c.restore();

  // Draw legs
  this.drawLegs();

  // Draw lights
  this.drawLights();
};
