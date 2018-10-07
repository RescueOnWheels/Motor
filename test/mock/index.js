const constructor = require('./constructor.test');
const left = require('./left.test');
const setGlobalPower = require('./setGlobalPower.test');
const setSoftStart = require('./setSoftStart.test');

describe('Mock', () => {
  describe('constructor', constructor);
  describe('left', left);
  describe('setGlobalPower', setGlobalPower);
  describe('setSoftStart', setSoftStart);
});
