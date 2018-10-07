/**
 * BDD / TDD assertion library.
 */
const chai = require('chai');

/**
 * Class to test.
 */
const motor = require('./../../');

chai.should();

module.exports = () => {
  it('should have access to the \'write_history\' property of wire', () => {
    motor.wire.should.have.property('write_history');
  });

  it('should have access to the \'write_history\' property of wire, which should be an array', () => {
    motor.wire.write_history.should.be.a('array');
  });

  it('should have access to the \'options\' property of wire', () => {
    motor.wire.should.have.property('options');
  });

  it('should have access to the \'device\' property of wire.options', () => {
    motor.wire.options.should.have.property('device');
  });

  it('should set the \'device\' property of wire.options to \'/dev/i2c-1\'', () => {
    motor.wire.options.device.should.equal('/dev/i2c-1');
  });
};
