let I2C;
if (process.env.NODE_ENV) {
  I2C = ('./i2c.mock');
} else {
  I2C = ('i2c');
}

module.exports = require(I2C); // eslint-disable-line import/no-dynamic-require
