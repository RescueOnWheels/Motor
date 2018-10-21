/* Motor */
const constructor = require('./constructor.test');
const left = require('./left.test');
const move = require('./move.test');
const right = require('./right.test');
const setGlobalPower = require('./setGlobalPower.test');
const setSoftStart = require('./setSoftStart.test');
const stop = require('./stop.test');
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
    describe('left', left);
    describe('move', move);
    describe('right', right);
    describe('setGlobalPower', setGlobalPower);
    describe('setSoftStart', setSoftStart);
    describe('stop', stop);
    describe('write', write);
  });
});
