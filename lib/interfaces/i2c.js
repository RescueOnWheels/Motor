/* istanbul ignore file */

let toMockOrNotToMockThatIsTheQuestion;
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'CI') {
  // eslint-disable-next-line no-console
  console.warn('Motor: Using the mock I2C package!');

  toMockOrNotToMockThatIsTheQuestion = ('./i2c.mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('i2c');
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(toMockOrNotToMockThatIsTheQuestion);
