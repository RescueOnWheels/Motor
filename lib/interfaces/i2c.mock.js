/* eslint-disable require-jsdoc, class-methods-use-this */

const { EventEmitter } = require('events');

class i2c extends EventEmitter {
  constructor(address, options) {
    super();

    this.address = address;
    this.options = options;

    this.write_history = [];

    this.EEPROM = [];
  }

  write(buffer) {
    // Write to EEPROM
    if (buffer[0] === 0x91) {
      const [address, value] = buffer;
      this.EEPROM[address] = value;
    }

    this.write_history.push(buffer);
  }
}

module.exports = i2c;
