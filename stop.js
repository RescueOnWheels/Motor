const wheel = require('./');
const I2C = require('i2c');
try {
  console.log('Deus Ex Machina');
  wheel.Stop();
} catch (error) {
  console.log('y u no work!?');
  console.log(error);
}
