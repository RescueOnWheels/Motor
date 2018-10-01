const I2C = require('./interfaces/i2c');

/**
 * Class motor which contains all the functions which makes it possible
 * for the RRS to move all directions.
 *
 * @class
 */
class Motor {
  /**
   * Opening the bus connection to the specified address.
   *
   * @param {Number} [address=0x32] - I2C address
   */
  constructor(address = 0x32) {
    this.wire = new I2C(address, { device: '/dev/i2c-1' });
    // point to your i2c address, debug provides REPL interface
  }

  /**
   * The function which makes the RRS rotate to the left on his own axle.
   * So turning the right wheels forwards and the left wheels backwards.
   *
   * @function
   * @returns {undefined}
   */
  Left() {
    const left = [7, 3, 0xa5, 1, 3, 0xa5, 2];
    this.write(left);
  }

  /**
   * The function which makes the RRS rotate to the right on his own axle.
   * So turning the right wheels backwards and the left wheels forwards.
   *
   * @function
   * @returns {undefined}
   */
  Right() {
    const right = [7, 3, 0xa5, 2, 3, 0xa5, 1];
    this.write(right);
  }

  /**
   * The function which stops the RRS from moving.
   *
   * @function
   * @returns {undefined}
   */
  Stop() {
    const stopping = [7, 0, 0, 0, 0, 0, 0];
    this.write(stopping);
  }

  /**
   * The function which makes it possible to let the RRS drive backwards.
   * The direction, 1, makes the wheels turn backwards.
   *
   * @function
   * @returns {undefined}
   */
  Backwards() {
    const backwards = [7, 3, 0xa5, 1, 3, 0xa5, 1];
    this.write(backwards);
  }

  /**
   * In this function, the direction and speed for both sides of wheels is being calculated.
   * The controller provides a speed, direction and balance.
   *
   * @function
   * @param {Object} instruction - Object containing speed, direction and balance.
   * @param {Number} instruction.speed - The amount of throttle, value between 0 - 1023.
   * @param {Number} instruction.direction - The direction of wheel rotation, value between 1 or 2.
   * @param {Number} instruction.balance - The wheel balance, value between -255 - 255.
   * @returns {undefined}
   */
  Forward({ speed, direction, balance }) {
    const leftSpeed = speed + (balance * 1);
    const rightSpeed = speed - (balance * 1);

    let leftDir = direction;
    if (leftSpeed < 0) {
      leftDir = (leftDir === 1 ? 2 : 1);
    }

    let rightDir = direction;
    if (rightSpeed < 0) {
      rightDir = (rightDir === 1 ? 2 : 1);
    }

    const forward = [7, (leftSpeed >> 8) & 0xFF, leftSpeed & 0xFF, leftDir, (rightSpeed >> 8) & 0xFF, rightSpeed & 0xFF, rightDir]; // eslint-disable-line max-len
    this.write(forward);
  }

  /**
   * Uses the wirewrite package to write the data to the Rover.
   *
   * @function
   * @param {Object} instruction - Buffer containing command and data.
   * @returns {undefined}
   */
  write(instruction) {
    this.wire.write(instruction, (err) => {
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
