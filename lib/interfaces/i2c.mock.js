const { EventEmitter } = require('events');

class i2c extends EventEmitter {
  constructor(address, options) {
    super();

    this.address = address;
    this.options = options;

    this.EEPROM = [];

    for (let i = 0; i <= 255; i += 1) {
      this.EEPROM.push(null);
    }
  }

  /**
   * Write to the I2C bus.
   *
   * @param {Array} buffer - Message to write to the I2C bus.
   * @param {Object} callback - Callback used for passing errors.
   */
  write(buffer, callback) {
    switch (buffer[0]) {
      /**
       * DC Motor power and direction for both M1-M2 and M2-M3.
       *
       * Format: <7>,<p1H>,<p1L>,<d1>,<p2H>,<p2L>,<d2>
       */
      case 7:
      {
        break;
      }

      /**
         * Write to EEPROM
         *
         * Format: <145>,<EEPROM address>,<value>
         */
      case 145:
      {
        const [, address, value] = buffer;
        this.EEPROM[address] = value;
        callback(null);
        break;
      }

      /**
         * Throw error for unimplemented commands.
         */
      default:
      {
        const [command, ...args] = buffer;
        callback(new Error(`Unknown command '${command}' with args: '${args}'`));
        break;
      }
    }
  }
}

module.exports = i2c;
