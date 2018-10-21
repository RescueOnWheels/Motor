/* Packages */
const chai = require('chai');

/* Test target */
const { wire } = require('./../../../');

chai.should();

module.exports = () => {
  it('should set the I2C address to `0x32`.', () => {
    wire.address.should.equal(0x32);
  });

  it('should have access to the \'options\' property of wire', () => {
    wire.should.have.property('options');
  });

  it('should have access to the \'options\' property of wire, which should be an object', () => {
    wire.options.should.be.a('object');
  });

  it('should have access to the \'device\' property of wire.options', () => {
    wire.options.should.have.property('device');
  });

  it('should set the I2C device to `/dev/i2c-1`.', () => {
    wire.options.device.should.equal('/dev/i2c-1');
  });

  it('should have access to the \'EEPROM\' property of wire', () => {
    wire.should.have.property('EEPROM');
  });

  it('should have access to the \'EEPROM\' property of wire, which should be an array', () => {
    wire.EEPROM.should.be.a('array');
  });
};
