/* Interfaces */
const I2C = require('./interfaces/i2c');

/* Auxilio */
const {
  Debug,
  isDuplicate,
  normalize,
} = require('./Auxilio');

/* Debug */
const debug = Debug('RRS:Motor');

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

    this.forwardMulti = 1;
    this.lastMove = {};
  }

  /**
   * Sends speed and direction to both sides of the wheels.
   *
   * @param {Number} speed - A value between 0 and 100.
   * @param {Number} direction - Stop: 0, Backwards: 1 and Forwards: 2.
   * @param {Number} balance - A value between -100 and 100.
   */
  move({ speed = 0, direction = 0, balance = 0 }) {
    /* Save last commands */
    this.lastMove = { speed, balance, direction };

    /* Validate input */
    speed = normalize(speed, 0, 100);

    /* Validate input */
    direction = normalize(direction, 0, 2, true);

    /* Validate input */
    balance = normalize(balance, -100, 100);

    /* Convert and validate */
    speed /= 100;
    speed *= 1023;
    speed = normalize(speed, 0, 1023, true);

    /* Convert and validate */
    balance /= 100;
    balance *= speed;
    balance = normalize(balance, -1023, 1023, true);

    /* Calculated speed and direction */
    const leftDirection = normalize(direction, 0, 2, true);
    let leftSpeed = normalize(speed + balance, 0, 1023, true);

    if (leftDirection === 2) {
      leftSpeed *= this.forwardMulti;
    }

    const p1H = (leftSpeed >> 8) & 255;
    const p1L = leftSpeed & 255;
    const p1D = leftDirection;

    /* Calculated speed and direction */
    const rightDirection = normalize(direction, 0, 2, true);
    let rightSpeed = normalize(speed - balance, 0, 1023, true);

    if (rightDirection === 2) {
      rightSpeed *= this.forwardMulti;
    }

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
   * Sets the PWM to 0. Passive breaking!
   */
  stop() {
    debug('Stopping.');
    this.write([7, 0, 0, 0, 0, 0, 0]);
  }

  /**
   * Rotates the Rover counter-clockwise for an infinite amount of time.
   */
  turnLeft() {
    debug('Turning left.');
    this.write([7, 2, 255, 1, 3, 255, 2]);
  }

  /**
   * Rotates the Rover clockwise for an infinite amount of time.
   */
  turnRight() {
    debug('Turning right.');
    this.write([7, 2, 255, 2, 3, 255, 1]);
  }

  /**
   * This set an overall power that will effect all motor operations and modes.
   *
   * @param {Number} power - Value from 0 to 100, where 0 is no power and 100 is full power.
   */
  setGlobalPower(power) {
    /* Validate input */
    power = normalize(power, 0, 100);

    /* Convert and validate */
    power /= 100;
    power *= 255;
    power = normalize(power, 0, 255, true);

    /* Package for the PWM controller */
    const buffer = [145, 22, power];

    /* Debug it */
    debug('Global Power: %o', buffer);

    /* Write to the PWM controller */
    this.write(buffer);
  }

  /**
   * Delays each step in the requested power by the amount given.
   *
   * @param {Number} delay - Value from 0 to 100, where 0 is no delay and 100 equals 255ms delay.
   */
  setSoftStart(delay) {
    /* Validate input */
    delay = normalize(delay, 0, 100);

    /* Convert and validate */
    delay /= 100;
    delay *= 255;
    delay = normalize(delay, 0, 255, true);

    /* Package for the PWM controller */
    const buffer = [145, 23, delay];

    /* Debug it */
    debug('Soft Start: %o', buffer);

    /* Write to the PWM controller */
    this.write(buffer);
  }

  /**
   * Sets the forward multiplier, used by the auto-stop functionality.
   *
   * @param {Number} multi - Value from 0 to 100, where 0 means no power and 100 is full power.
   */
  setForwardMulti(multi) {
    /* Validate input */
    multi = normalize(multi, 0, 100);

    /* Convert and validate */
    multi /= 100;
    multi = normalize(multi, 0, 1);

    /* Prevent duplicate calls */
    if (this.forwardMulti === multi) {
      return;
    }

    /* Debug it */
    debug('Forward multiplier: %o', multi);

    /* Update multiplier */
    this.forwardMulti = multi;

    /* Overwrite last move command */
    this.move(this.lastMove);
  }

  /**
   * Uses the wirewrite package to write the data to the Rover.
   *
   * @param {Object} instruction - Buffer containing command and data.
   */
  write(instruction) {
    const isDupe = isDuplicate(instruction, this.wire.write_history);

    if (isDupe) {
      debug('Gotcha duplicate command, bye bye');
      return;
    }

    this.wire.write(instruction, (err) => {
      if (!err) {
        return;
      }

      debug('Houston we have a problem:', err);
      this.stop();
    });
  }
}

/**
 * Singleton pattern because `require` caches the value assigned to `module.exports`,
 * all calls to `require` will return this same instance.
 */
module.exports = exports = new Motor(); // eslint-disable-line no-multi-assign
