const constructor = require('./constructor.test');
const movement = require('./movement.test');
const left = require('./left.test');
const setGlobalPower = require('./setGlobalPower.test');
const setSoftStart = require('./setSoftStart.test');

describe('Mock', () => {
  describe('constructor', constructor);
  describe('movement', movement);
  describe('left', left);
  describe('setGlobalPower', setGlobalPower);
  describe('setSoftStart', setSoftStart);
});
