function Motor() {

}

const I2C = require('i2c');

const address = 0x32;
const wire = new I2C(address, { device: '/dev/i2c-1' }); // point to your i2c address, debug provides REPL interface

function wireWrite(side) {
  wire.write(side, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// Rotating to the left
Motor.prototype.Left = () => {
  const left = [7, 3, 0xa5, 1, 3, 0xa5, 2];
  wireWrite(left);
};

// Rotating to the right
Motor.prototype.Right = () => {
  const right = [7, 3, 0xa5, 2, 3, 0xa5, 1];
  wireWrite(right);
};

// Driving to the left
Motor.prototype.LeftDrive = () => {
  const left = [7, 3, 0x52, 2, 3, 0xa5, 2];
  wireWrite(left);
};

// Forwards
Motor.prototype.Forward = (direction) => {
  const left = Math.round(255 - ((255 / 200) * (direction + 100)));
  const right = 255 - left;
  const forward = [7, 3, left, 2, 3, right, 2];
  wireWrite(forward);
};

// Full power forwards
Motor.prototype.Boost = () => {
  const boostForward = [7, 3, 0xFF, 2, 3, 0xFF, 2];
  wireWrite(boostForward);
};

// Stopping
Motor.prototype.Stop = () => {
  const stopping = [7, 0, 0, 0, 0, 0, 0];
  wireWrite(stopping);
};

module.exports = Motor;
