/* Packages */
const chai = require('chai');

/* Test target */
const motor = require('./../../');

chai.should();

module.exports = () => {
  beforeEach(() => {
    motor.wire.write_history = [];
  });

  describe('duplicate commands', () => {
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
  });

  describe('(un)known commands', () => {
    it('should send stop command if there is an error (e.g. an unknown command)', () => {
      // Arrange
      const command = [1, 2, 3, 4];

      // Act
      motor.write(command);

      // Assert
      motor.wire.write_history.length.should.equal(2);
      motor.wire.write_history[1].should.deep.equal([7, 0, 0, 0, 0, 0, 0]);
    });
  });
};
