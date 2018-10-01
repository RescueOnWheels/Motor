/* eslint-disable require-jsdoc, class-methods-use-this */

const { EventEmitter } = require('events').EventEmitter;

class i2c extends EventEmitter {
  constructor(address, options) {
    super();

    this.address = address;
    this.options = options;
  }

  write() {}
}

module.exports = i2c;
