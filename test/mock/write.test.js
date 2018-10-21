/* Packages */
const chai = require('chai');

/* Test target */
const motor = require('./../../');

const should = chai.should();

module.exports = () => {
  describe('duplicate commands', () => {
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
  });

  describe('(un)known commands', () => {
    it('should throw an error for an unknown command', () => {
      // Arrange
      const command = [1, 2, 3, 4];

      try {
        // Act
        motor.write(command);

        // Assert
        should.fail('No error was thrown when it should have been!');
      } catch (err) {
        // Assert
        err.should.be.an.instanceOf(Error);
        err.should.have.property('message', 'Unknown command \'1\' with args: \'2,3,4\'');
      }
    });
  });
};
