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
   *
   *
   * @param {Number} speed - A value between 0 and 100.
   * @param {Number} direction - Stop: 0, Backwards: 1 and Forwards: 2.
   * @param {Number} balance - A value between -100 and 100.
   */
  move({ speed = 0, direction = 0, balance = 0 }) {
    /* Validate input */
    speed = Math.round(speed);
    speed = Math.max(speed, 0);
    speed = Math.min(speed, 100);

    /* Validate input */
    direction = Math.round(direction);
    direction = Math.max(direction, 0);
    direction = Math.min(direction, 2);

    /* Validate input */
    balance = Math.round(balance);
    balance = Math.max(balance, -100);
    balance = Math.min(balance, 100);

    /* Convert and validate */
    speed /= 100;
    speed *= 1023;
    speed = Math.round(speed);
    speed = Math.max(speed, 0);
    speed = Math.min(speed, 1023);

    /* Convert and validate */
    balance /= 100;
    balance *= 1023;
    balance = Math.round(balance);
    balance = Math.max(balance, -1023);
    balance = Math.min(balance, 1023);

    /* Calculated speed and direction */
    let leftDirection = direction;
    let leftSpeed = speed + balance;

    if (leftSpeed < 0) {
      leftDirection = (leftDirection === 1 ? 2 : 1);
      leftSpeed *= -1;
    }

    /* Validate output */
    leftDirection = Math.max(leftDirection, 0);
    leftDirection = Math.min(leftDirection, 2);
    leftSpeed = Math.max(leftSpeed, 0);
    leftSpeed = Math.min(leftSpeed, 1023);

    const p1H = (leftSpeed >> 8) & 255;
    const p1L = leftSpeed & 255;
    const p1D = leftDirection;

    /* Calculated speed and direction */
    let rightDirection = direction;
    let rightSpeed = speed - balance;

    if (rightSpeed < 0) {
      rightDirection = (rightDirection === 1 ? 2 : 1);
      rightSpeed *= -1;
    }

    /* Validate output */
    rightDirection = Math.max(rightDirection, 0);
    rightDirection = Math.min(rightDirection, 2);
    rightSpeed = Math.max(rightSpeed, 0);
    rightSpeed = Math.min(rightSpeed, 1023);

    const p2H = (rightSpeed >> 8) & 255;
    const p2L = rightSpeed & 255;
    const p2D = rightDirection;

    /* Package for the PWM controller */
    const buffer = [7, p1H, p1L, p1D, p2H, p2L, p2D];

    /* Debug it */
    debug('Move: %o', buffer);

    /* Write to the PWM controller */
    this.write(buffer);
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
