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
  it('should send a buffer with a length of \'7\'', () => {
    // Act
    motor.Backwards();

    // Assert
    motor.wire.write_history[motor.wire.write_history.length - 1].should.have.lengthOf(7);
  });

  it('should send command \'7\'', () => {
    // Act
    motor.Backwards();

    // Assert
    motor.wire.write_history[motor.wire.write_history.length - 1][0].should.equal(7);
  });

  it('should set direction index [3] and [6] to \'1\'', () => {
    // Act
    motor.Backwards();

    // Assert
    motor.wire.write_history[motor.wire.write_history.length - 1][3].should.equal(1);
    motor.wire.write_history[motor.wire.write_history.length - 1][6].should.equal(1);
  });
};
