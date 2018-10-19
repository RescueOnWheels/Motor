const constructor = require('./constructor.test');
const move = require('./move.test');
const left = require('./left.test');
const setGlobalPower = require('./setGlobalPower.test');
const setSoftStart = require('./setSoftStart.test');

describe('Mock', () => {
  describe('constructor', constructor);
  describe('move', move);
  describe('left', left);
  describe('setGlobalPower', setGlobalPower);
  describe('setSoftStart', setSoftStart);
});
