/* Motor */
const constructor = require('./constructor.test');
const move = require('./move.test');
const setGlobalPower = require('./setGlobalPower.test');
const setSoftStart = require('./setSoftStart.test');
const stop = require('./stop.test');
const turnLeft = require('./turnLeft.test');
const turnRight = require('./turnRight.test');
const write = require('./write.test');

/* Helpers */
const arraysEqual = require('./helpers/arraysEqual.test');

/* Interfaces */
const i2c = require('./interfaces/i2c.mock.test');

describe('Mock', () => {
  describe('helpers', () => {
    describe('arraysEqual', arraysEqual);
  });

  describe('interfaces', () => {
    describe('i2c.mock', i2c);
  });

  describe('motor', () => {
    describe('constructor', constructor);
    describe('move', move);
    describe('setGlobalPower', setGlobalPower);
    describe('setSoftStart', setSoftStart);
    describe('stop', stop);
    describe('turnLeft', turnLeft);
    describe('turnRight', turnRight);
    describe('write', write);
  });
});
