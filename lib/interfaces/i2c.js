let toMockOrNotToMockThatIsTheQuestion;

/* istanbul ignore else */
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'CI') {
  // eslint-disable-next-line no-console
  console.warn('Motor: Using the mock I2C package!');

  toMockOrNotToMockThatIsTheQuestion = ('./i2c.mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('i2c');
}

// eslint-disable-next-line import/no-dynamic-require
const base = require(toMockOrNotToMockThatIsTheQuestion);

class I2C extends base {
  constructor(address, options, ...args) {
    super(address, options, args);

    this.write_history = [];
  }

  write(buffer, callback, ...args) {
    this.write_history.push(buffer);
    super.write(buffer, callback, args);
  }
}

module.exports = I2C;
