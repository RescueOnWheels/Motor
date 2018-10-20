const constructor = require('./constructor.test');
const left = require('./left.test');
const move = require('./move.test');
const right = require('./right.test');
const setGlobalPower = require('./setGlobalPower.test');
const setSoftStart = require('./setSoftStart.test');
const stop = require('./stop.test');

describe('Mock', () => {
  describe('constructor', constructor);
  describe('left', left);
  describe('move', move);
  describe('right', right);
  describe('setGlobalPower', setGlobalPower);
  describe('setSoftStart', setSoftStart);
  describe('stop', stop);
});
