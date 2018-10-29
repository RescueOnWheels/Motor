/* Packages */
const chai = require('chai');

/* Test target */
const motor = require('./../../');

chai.should();

module.exports = () => {
  it('should prevent duplicate commands', () => {
    // Act
    motor.move({ speed: 100 });
    motor.setForwardMulti(0);
    motor.setForwardMulti(0);

    // Assert
    motor.wire.write_history.should.equal(2);
  });

  describe('test cases', () => {
    it('should set `Forward Multi` to 0 if the input is 0.', () => {
      // Act
      motor.setForwardMulti(0);

      // Arrange
      motor.forwardMulti.should.equal(0);
    });

    it('should set `Forward Multi` to 0.5 if the input is 50.', () => {
      // Act
      motor.setForwardMulti(50);

      // Arrange
      motor.forwardMulti.should.equal(0.5);
    });

    it('should set `Forward Multi` to 1 if the input is 100.', () => {
      // Act
      motor.setForwardMulti(100);

      // Arrange
      motor.forwardMulti.should.equal(1);
    });
  });
};
