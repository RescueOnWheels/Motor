/* eslint-disable require-jsdoc, prefer-rest-params */

let toMockOrNotToMockThatIsTheQuestion;
if (process.env.NODE_ENV) {
  console.warn('Motor: Using the mock I2C package!'); // eslint-disable-line no-console
  toMockOrNotToMockThatIsTheQuestion = ('./i2c.mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('i2c');
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(toMockOrNotToMockThatIsTheQuestion);
