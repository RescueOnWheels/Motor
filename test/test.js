let toMockOrNotToMockThatIsTheQuestion;
if (process.env.NODE_ENV) {
  console.warn('Motor: Using the mock tests!');
  toMockOrNotToMockThatIsTheQuestion = ('./mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('./real');
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(toMockOrNotToMockThatIsTheQuestion);
