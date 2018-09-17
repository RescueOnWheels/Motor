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

// Stopping
Motor.prototype.Stop = () => {
  const stopping = [7, 0, 0, 0, 0, 0, 0];
  wireWrite(stopping);
};

// Forwards
// [bytes, 3, speed, direction, 3, speed, direction]
// Speed 0 - 100, direction -1 - 1, balance -100 - 100
Motor.prototype.Forward = ({speed, direction, balance}) => {
  const leftSpeed = speed + balance;
  const rightSpeed = speed - balance;
  
  let leftDir = direction;
  if (leftSpeed < 10) {
    leftDir = 0;
  };

  let rightDir = direction;
  if (rightSpeed < 10) {
    rightDir = 0;
  };
  
  const forward = [7, 3, leftSpeed, leftDir, 3, rightSpeed, rightDir];
  wireWrite(forward);
};

module.exports = Motor;
