/* Packages */
const chai = require('chai');

/* Test target */
const motor = require('./../../');

chai.should();

module.exports = () => {
  describe('syntax', () => {
    it('should send a buffer with a length of \'2\'', () => {
      // Act
      motor.setGlobalPower(255);

      // Assert
      motor.wire.write_history[motor.wire.write_history.length - 1].should.have.lengthOf(2);
    });

    it('should send command \'4\'', () => {
      // Act
      motor.setGlobalPower(255);

      // Assert
      motor.wire.write_history[motor.wire.write_history.length - 1][0].should.equal(4);
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

    it('should set `Global Power` to 127 if the input is 127.', () => {
      // Act
      motor.setGlobalPower(127);

      // Arrange
      motor.wire.EEPROM[22].should.equal(127);
    });

    it('should set `Global Power` to 255 if the input is 255.', () => {
      // Act
      motor.setGlobalPower(255);

      // Arrange
      motor.wire.EEPROM[22].should.equal(255);
    });
  });
};
