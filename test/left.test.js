/**
 * BDD / TDD assertion library.
 */
const chai = require('chai');

/**
 * Class to test.
 */
const motor = require('./../');

chai.should();

describe('left', () => {
  it('should send a buffer with a length of \'7\'', () => {
    // Act
    motor.Left();

    // Assert
    motor.wire.write_history[motor.wire.write_history.length - 1].should.have.lengthOf(7);
  });

  it('should send command \'7\'', () => {
    // Act
    motor.Left();

    // Assert
    motor.wire.write_history[motor.wire.write_history.length - 1][0].should.equal(7);
  });
});
