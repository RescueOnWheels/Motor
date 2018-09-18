const I2C = require('i2c');

const address = 0x32;

class Motor {
  constructor() {
    this.wire = new I2C(address, { device: '/dev/i2c-1' }); // point to your i2c address, debug provides REPL interface
  }

  // Rotating to the left
  Left() {
    const left = [7, 3, 0xa5, 1, 3, 0xa5, 2];
    this.write(left);
  }

  // Rotating to the right
  Right() {
    const right = [7, 3, 0xa5, 2, 3, 0xa5, 1];
    this.write(right);
  }

  // Stopping
  Stop() {
    const stopping = [7, 0, 0, 0, 0, 0, 0];
    this.write(stopping);
  }

  // Forwards
  // [bytes, 3, speed, direction, 3, speed, direction]
  // Speed 0 - 100, direction -1 - 1, balance -100 - 100
  Forward({ speed, direction, balance }) {
    const leftSpeed = speed + balance;
    const rightSpeed = speed - balance;
    let leftDir = direction;
    if (leftSpeed < 10) {
      leftDir = 0;
    }

    let rightDir = direction;
    if (rightSpeed < 10) {
      rightDir = 0;
    }

    const forward = [7, 3, leftSpeed, leftDir, 3, rightSpeed, rightDir];
    this.write(forward);
  }

  write(side) {
    this.wire.write(side, (err) => {
      if (err) {
        console.error('Motor: Houston we have a problem:', err);
      }
    });
  }
}

module.exports = Motor;
