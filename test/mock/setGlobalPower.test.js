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

  it('should set EEPROM index 22 to the specified value', () => {
    for (let i = 0; i < 10; i += 1) {
      // Act
      motor.setGlobalPower(i);

      // Assert
      motor.wire.EEPROM[22].should.equal(i);
    }
  });
};
