let toMockOrNotToMockThatIsTheQuestion;
if (process.env.NODE_ENV) {
  // eslint-disable-line no-console
  console.warn('Motor: Using the mock tests!'); // eslint-disable-line no-console
  toMockOrNotToMockThatIsTheQuestion = ('./mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('./real');
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(toMockOrNotToMockThatIsTheQuestion);
