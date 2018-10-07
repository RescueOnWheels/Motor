const constructor = require('./constructor.test');
const forward = require('./forward.test');
const left = require('./left.test');
const setGlobalPower = require('./setGlobalPower.test');
const setSoftStart = require('./setSoftStart.test');

describe('Mock', () => {
  describe('constructor', constructor);
  describe('forward', forward);
  describe('left', left);
  describe('setGlobalPower', setGlobalPower);
  describe('setSoftStart', setSoftStart);
});
