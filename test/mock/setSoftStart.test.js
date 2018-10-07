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
  it('should send a buffer with a length of \'3\'', () => {
    // Act
    motor.setSoftStart(255);

    // Assert
    motor.wire.write_history[motor.wire.write_history.length - 1].should.have.lengthOf(3);
  });

  it('should send command \'0x91\'', () => {
    // Act
    motor.setSoftStart(255);

    // Assert
    motor.wire.write_history[motor.wire.write_history.length - 1][0].should.equal(0x91);
  });
};
