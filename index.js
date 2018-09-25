/**
 * Bindings for i2c-dev. Plays well with Raspberry Pi and Beaglebone.
 */
const I2C = require('i2c');

/**
 * Class motor which makes it possible for the RSS to move all directions.
 * 
 * @class
 */
class Motor {
  constructor(address = 0x32) {
    this.wire = new I2C(address, { device: '/dev/i2c-1' }); // point to your i2c address, debug provides REPL interface
  }

  /**
   * The function which makes the RRS rotate to the left on his own axle. So turning the right wheels forwards
   * and the left wheels backwards.
   * 
   * @function
   */
  Left() {
    const left = [7, 3, 0xa5, 1, 3, 0xa5, 2];
    this.write(left);
  }

  /**
   * The function which makes the RRS rotate to the right on his own axle. So turning the right wheels backwards
   * and the left wheels forwards.
   * 
   * @function
   */
  Right() {
    const right = [7, 3, 0xa5, 2, 3, 0xa5, 1];
    this.write(right);
  }

  /**
   * The function which stops the RRS from moving.
   * 
   * @function
   */
  Stop() {
    const stopping = [7, 0, 0, 0, 0, 0, 0];
    this.write(stopping);
  }

  /**
   * The function which makes it possible to let the RRS drive backwards. The direction, 1, makes the wheels
   * turn backwards.
   * 
   * @function
   */
  Backwards() {
    const backwards = [7, 3, 0xa5, 1, 3, 0xa5, 1];
    this.write(backwards);
  }

  /**
   * In this function, the direction and speed for both sides of wheels is being calculated. The controller
   * provides a speed, direction and balance. 
   * 
   * @function
   * @param {object} instruction
   * @param {number} instruction.speed - The amount of throttle given from the controller. Value between 0 - 255. - 
   * @param {number} instruction.direction - The direction of wheel rotation given from the controller. Value between 1 or 2.
   * @param {number} instruction.balance - The balance between the wheels. Value between -255 - 255.
   */
  Forward({ speed, direction, balance }) {
    const leftSpeed = speed + (balance * 1.25);
    const rightSpeed = speed - (balance * 1.25);

    let leftDir = direction;
    if (leftSpeed < 0) {
      leftDir = (leftDir === 1 ? 2 : 1);
    }

    let rightDir = direction;
    if (rightSpeed < 0) {
      rightDir = (rightDir === 1 ? 2 : 1);
    }

    const forward = [7, 3, leftSpeed, leftDir, 3, rightSpeed, rightDir];
    this.write(forward);
  }

  /**
   * Uses the wirewrite package to write the data to the Rover.
   * 
   * @function
   * @param {object} instruction
   * @param {string} instruction.side - Gives the desired side to write to.
   */
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
