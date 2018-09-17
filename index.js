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
// [bytes, 3, speed, direction, 3, speed, direction]
// Speed 0 - 100, direction -1 - 1, balance -100 - 100
Motor.prototype.Forward = ({speed, direction, balance}) => {
  const leftspeed = speed + balance;
  const rightspeed = speed - balance;
  
  const forward = [7, 3, leftspeed, direction, 3, rightspeed, direction ];
  wireWrite(forward);
};

// Stopping
Motor.prototype.Stop = () => {
  const stopping = [7, 0, 0, 0, 0, 0, 0];
  wireWrite(stopping);
};

module.exports = Motor;
