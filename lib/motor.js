/* Debug */
const debug = require('debug')('RRS:Motor');

/* Interfaces */
const I2C = require('./interfaces/i2c');

/**
 * Class representing the PWM controller of the Rover.
 */
class Motor {
  /**
   * Setup the PWM controller.
   *
   * @param {Number} address - I2C address of the PWM controller.
   */
  constructor(address = 0x32) {
    this.wire = new I2C(address, {
      device: '/dev/i2c-1',
    });
  }

  /**
   * The function which makes the RRS rotate to the left on his own axle.
   * So turning the right wheels forwards and the left wheels backwards.
   */
  Left() {
    const left = [7, 3, 165, 1, 3, 165, 2];

    debug('Turning left.');

    this.write(left);
  }

  /**
   * The function which makes the RRS rotate to the right on his own axle.
   * So turning the right wheels backwards and the left wheels forwards.
   */
  Right() {
    const right = [7, 3, 165, 2, 3, 165, 1];

    debug('Turning right.');

    this.write(right);
  }

  /**
   * The function which stops the RRS from moving.
   */
  Stop() {
    const stopping = [7, 0, 0, 0, 0, 0, 0];

    debug('Stopping.');

    this.write(stopping);
  }

  /**
   * In this function, the direction and speed for both sides of wheels is being calculated.
   * The controller provides a speed, direction and balance.
   *
   * @param {Object} instruction - Object containing speed, direction and balance.
   * @param {Number} instruction.speed - The amount of throttle, value between 0 - 1023.
   * @param {Number} instruction.direction - The direction of wheel rotation, value between 1 or 2.
   * @param {Number} instruction.balance - The wheel balance, value between -255 - 255.
   */
  Movement({ speed, direction, balance }) {
    let tSpeed = speed;
    tSpeed = Math.min(speed, 1023);
    tSpeed = Math.max(speed, 0);

    let tDirection = direction;
    tDirection = Math.min(tDirection, 2);
    tDirection = Math.max(tDirection, 0);

    let leftSpeed = tSpeed + (balance * 1);
    let rightSpeed = tSpeed - (balance * 1);

    let leftDir = tDirection;
    if (leftSpeed < 0) {
      leftDir = (leftDir === 1 ? 2 : 1);
      leftSpeed *= -1;
    }

    leftSpeed = Math.min(leftSpeed, 1023);
    leftSpeed = Math.max(leftSpeed, 0);

    let rightDir = tDirection;
    if (rightSpeed < 0) {
      rightDir = (rightDir === 1 ? 2 : 1);
      rightSpeed *= -1;
    }

    rightSpeed = Math.min(rightSpeed, 1023);
    rightSpeed = Math.max(rightSpeed, 0);

    const movement = [7, (leftSpeed >> 8) & 255, leftSpeed & 255, leftDir, (rightSpeed >> 8) & 255, rightSpeed & 255, rightDir]; // eslint-disable-line max-len

    debug('Going forwards at L(%d:%d) and R(%d:%d).', movement[1], movement[2], movement[4], movement[5]);

    this.write(movement);
  }

  /**
   * This set an overall power that will effect all motor operations and modes.
   *
   * @param {Number} power - Value from 0 to 255, where 0 is no power and 255 is full power.
   */
  setGlobalPower(power) {
    let gPower = power;
    gPower = Math.min(power, 255);
    gPower = Math.max(power, 0);

    debug('Setting Global Power to %d.', power);

    this.write([4, gPower]);
  }

  /**
   * Delays each step in the requested power by the amount given.
   *
   * @param {Number} delay - Value from 0 to 255, value is in steps of 0.1mS
   */
  setSoftStart(delay) {
    let sDelay = delay;
    sDelay = Math.min(sDelay, 255);
    sDelay = Math.max(sDelay, 0);

    debug('Setting Soft Start to %d.', delay);

    this.write([145, 23, sDelay]);
  }

  /**
   * Uses the wirewrite package to write the data to the Rover.
   *
   * @param {Object} instruction - Buffer containing command and data.
   */
  write(instruction) {
    this.wire.write(instruction, (err) => {
      if (!err) {
        return;
      }

      debug('Houston we have a problem:', err);
      this.write([7, 0, 0, 0, 0, 0, 0]);
    });
  }
}

/**
 * Singleton pattern because `require` caches the value assigned to `module.exports`,
 * all calls to `require` will return this same instance.
 */
module.exports = exports = new Motor(); // eslint-disable-line no-multi-assign
