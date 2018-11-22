/* Motor */
const constructor = require('./constructor.test');
const move = require('./move.test');
const setForwardMulti = require('./setForwardMulti.test');
const setGlobalPower = require('./setGlobalPower.test');
const setSoftStart = require('./setSoftStart.test');
const stop = require('./stop.test');
const turnLeft = require('./turnLeft.test');
const turnRight = require('./turnRight.test');
const write = require('./write.test');

/* Interfaces */
const i2c = require('./interfaces/i2c.mock.test');

/* Lib */
const Auxilio = require('./../../lib/Auxilio/test');

describe('Mock', () => {
  describe('interfaces', () => {
    describe('i2c.mock', i2c);
  });

  describe('motor', () => {
    describe('constructor', constructor);
    describe('move', move);
    describe('setForwardMulti', setForwardMulti);
    describe('setGlobalPower', setGlobalPower);
    describe('setSoftStart', setSoftStart);
    describe('stop', stop);
    describe('turnLeft', turnLeft);
    describe('turnRight', turnRight);
    describe('write', write);
  });

  describe('lib', () => {
    describe('Auxilio', Auxilio);
  });
});
