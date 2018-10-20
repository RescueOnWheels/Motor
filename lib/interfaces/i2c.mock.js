/* istanbul ignore file */

const { EventEmitter } = require('events');

class i2c extends EventEmitter {
  constructor(address, options) {
    super();

    this.address = address;
    this.options = options;

    this.write_history = [];

    this.EEPROM = [];

    for (let i = 0; i <= 255; i += 1) {
      this.EEPROM.push(null);
    }
  }

  write(buffer) {
    // Write to EEPROM

    switch (buffer[0]) {
      case 4:
      {
        const [, value] = buffer;
        this.EEPROM[22] = value;
        break;
      }

      case 0x91:
      {
        const [, address, value] = buffer;
        this.EEPROM[address] = value;
        break;
      }

      default:
        break;
    }

    this.write_history.push(buffer);
  }
}

module.exports = i2c;
