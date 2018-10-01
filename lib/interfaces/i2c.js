/* eslint-disable require-jsdoc, prefer-rest-params */

let toMockOrNotToMockThatIsTheQuestion;
if (process.env.NODE_ENV) {
  console.warn('Motor: Using the mock I2C package!');
  toMockOrNotToMockThatIsTheQuestion = ('./i2c.mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('i2c');
}

// eslint-disable-next-line import/no-dynamic-require
const base = require(toMockOrNotToMockThatIsTheQuestion);

class I2C extends base {
  constructor(...args) {
    super(...args);

    this.write_history = [];
  }

  write(buffer) {
    this.write_history.push(buffer);
    super.write.apply(this, arguments);
  }
}

module.exports = I2C;
