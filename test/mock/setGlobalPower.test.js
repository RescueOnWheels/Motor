/* Packages */
const chai = require('chai');

/* Test target */
const motor = require('./../../');

chai.should();

module.exports = () => {
  describe('syntax', () => {
    it('should send a buffer with a length of \'3\'', () => {
      // Act
      motor.setGlobalPower(255);

      // Assert
      motor.wire.write_history[motor.wire.write_history.length - 1].should.have.lengthOf(3);
    });

    it('should send command \'145\'', () => {
      // Act
      motor.setGlobalPower(255);

      // Assert
      motor.wire.write_history[motor.wire.write_history.length - 1][0].should.equal(145);
    });
  });

  describe('input', () => {});

  describe('test cases', () => {
    it('should set `Global Power` to 0 if the input is 0.', () => {
      // Act
      motor.setGlobalPower(0);

      // Arrange
      motor.wire.EEPROM[22].should.equal(0);
    });

    it('should set `Global Power` to 128 if the input is 50.', () => {
      // Act
      motor.setGlobalPower(50);

      // Arrange
      motor.wire.EEPROM[22].should.equal(128);
    });

    it('should set `Global Power` to 255 if the input is 100.', () => {
      // Act
      motor.setGlobalPower(100);

      // Arrange
      motor.wire.EEPROM[22].should.equal(255);
    });
  });
};
