/**
 * Bindings for i2c-dev. Plays well with Raspberry Pi and Beaglebone.
 */
const I2C = require('i2c');

class Motor {
  constructor(address = 0x32) {
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

  // Backwards
  Backwards() {
    const backwards = [7, 3, 0xa5, 1, 3, 0xa5, 1];
    this.write(backwards);
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
        this.write([7, 0, 0, 0, 0, 0, 0]);
      }
    });
  }
}

/**
 * Constructor
 *
 * Allows the user to create their own instance of Motor,
 * should be used whenever the Motor is not on I2C adress 0x32.
 */
Motor.prototype.Motor = Motor;

/**
 * Singleton
 *
 * Because `require` caches the value assigned to `module.exports`,
 * all calls to `require('./Motor')` will return this same instance.
 */
module.exports = exports = new Motor(); // eslint-disable-line no-multi-assign
