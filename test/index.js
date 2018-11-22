let toMockOrNotToMockThatIsTheQuestion;

/* istanbul ignore else */
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'CI') {
  // eslint-disable-line no-console
  console.warn('Motor: Using the mock tests!'); // eslint-disable-line no-console
  toMockOrNotToMockThatIsTheQuestion = ('./mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('./real');
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(toMockOrNotToMockThatIsTheQuestion);
