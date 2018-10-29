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
    motor.stop();

    // Assert
    motor.wire.write_history[motor.wire.write_history.length - 1].should.have.lengthOf(7);
  });

  it('should send command \'7\'', () => {
    // Act
    motor.stop();

    // Assert
    motor.wire.write_history[motor.wire.write_history.length - 1][0].should.equal(7);
  });

  it('should set indexes [1, 2, 3, 4, 5, 6] to \'0\'', () => {
    // Act
    motor.stop();

    // Assert
    motor.wire.write_history[motor.wire.write_history.length - 1][1].should.equal(0);
    motor.wire.write_history[motor.wire.write_history.length - 1][2].should.equal(0);
    motor.wire.write_history[motor.wire.write_history.length - 1][3].should.equal(0);
    motor.wire.write_history[motor.wire.write_history.length - 1][4].should.equal(0);
    motor.wire.write_history[motor.wire.write_history.length - 1][5].should.equal(0);
    motor.wire.write_history[motor.wire.write_history.length - 1][6].should.equal(0);
  });
};
