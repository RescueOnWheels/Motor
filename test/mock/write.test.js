/* Packages */
const chai = require('chai');

/* Test target */
const motor = require('./../../');

chai.should();

module.exports = () => {
  beforeEach(() => {
    motor.wire.write_history = [];
  });

  it('should prevent duplicate commands', () => {
    // Act
    motor.Stop();
    motor.Stop();

    // Assert
    motor.wire.write_history.length.should.equal(1);
  });


  it('should prevent duplicate commands, even if there is another function called in between.', () => {
    // Act
    motor.Stop();
    motor.setGlobalPower(10);
    motor.Stop();

    // Assert
    motor.wire.write_history.length.should.equal(2);
  });

  it('should not prevent commands, if there command is the same but values different.', () => {
    // Act
    motor.move({ speed: 10 });
    motor.move({ speed: 20 });

    // Assert
    motor.wire.write_history.length.should.equal(2);
  });

  it('should not prevent commands, if an older command is called again.', () => {
    // Act
    motor.move({ speed: 10 });
    motor.move({ speed: 20 });
    motor.move({ speed: 10 });

    // Assert
    motor.wire.write_history.length.should.equal(3);
  });
};
