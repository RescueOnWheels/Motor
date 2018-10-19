/* Packages */
const chai = require('chai');

/* Test target */
const motor = require('./../../');

chai.should();

module.exports = () => {
  describe('syntax', () => {
    it('should send command \'7\'', () => {
      // Act
      motor.move({
        speed: 0,
        direction: 0,
        balance: 0,
      });

      // Arrange
      const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

      // Assert
      lastCommand[0].should.equal(7);
    });

    it('should send an array with a length of \'7\'', () => {
      // Act
      motor.move({
        speed: 0,
        direction: 0,
        balance: 0,
      });

      // Arrange
      const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

      // Assert
      lastCommand.should.have.lengthOf(7);
    });
  });

  describe('input', () => {
    describe('speed', () => {
      it('p1H and p2H | should send a value equal to or greater than 0 and equal to or lower than 3', () => {
        for (let speed = 0; speed <= 100; speed += 1) {
          // Act
          motor.move({
            speed,
          });

          // Arrange
          const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

          // Assert
          lastCommand[1].should.be.within(0, 3, `Tested value is: 'speed': ${speed}.`);
          lastCommand[4].should.be.within(0, 3, `Tested value is: 'speed': ${speed}.`);
        }
      });

      it('p1L and p2L | should send a value equal to or greater than 0 and equal to or lower than 255', () => {
        for (let speed = 0; speed <= 100; speed += 1) {
          // Act
          motor.move({
            speed,
          });

          // Arrange
          const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

          // Assert
          lastCommand[2].should.be.within(0, 255, `Tested value is: 'speed': ${speed}.`);
          lastCommand[5].should.be.within(0, 255, `Tested value is: 'speed': ${speed}.`);
        }
      });
    });

    describe('direction', () => {
      it('should send a value equal to or greater than 0 and equal to or lower than 2', () => {
        for (let direction = 0; direction < 2; direction += 1) {
          // Act
          motor.move({
            direction,
          });

          // Arrange
          const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

          // Assert
          lastCommand[3].should.be.within(0, 2, `Tested value is: 'direction': ${direction}.`);
          lastCommand[6].should.be.within(0, 2, `Tested value is: 'direction': ${direction}.`);
        }
      });
    });

    describe('balance', () => {
      it('should stay within the limits of `speed` and `direction`, `direction` = 0', () => {
        const direction = 0;

        for (let speed = 0; speed <= 100; speed += 1) {
          for (let balance = -100; balance <= 100; balance += 1) {
            // Act
            motor.move({
              speed,
              direction,
              balance,
            });

            // Arrange
            const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

            // Assert
            lastCommand[1].should.be.within(0, 3, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
            lastCommand[4].should.be.within(0, 3, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);

            // Assert
            lastCommand[2].should.be.within(0, 255, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
            lastCommand[5].should.be.within(0, 255, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);

            // Assert
            lastCommand[3].should.be.within(0, 2, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
            lastCommand[6].should.be.within(0, 2, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
          }
        }
      }).timeout(10000);

      it('should stay within the limits of `speed` and `direction`, `direction` = 1', () => {
        const direction = 1;

        for (let speed = 0; speed <= 100; speed += 1) {
          for (let balance = -100; balance <= 100; balance += 1) {
            // Act
            motor.move({
              speed,
              direction,
              balance,
            });

            // Arrange
            const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

            // Assert
            lastCommand[1].should.be.within(0, 3, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
            lastCommand[4].should.be.within(0, 3, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);

            // Assert
            lastCommand[2].should.be.within(0, 255, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
            lastCommand[5].should.be.within(0, 255, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);

            // Assert
            lastCommand[3].should.be.within(0, 2, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
            lastCommand[6].should.be.within(0, 2, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
          }
        }
      }).timeout(10000);

      it('should stay within the limits of `speed` and `direction`, `direction` = 2', () => {
        const direction = 2;

        for (let speed = 0; speed <= 100; speed += 1) {
          for (let balance = -100; balance <= 100; balance += 1) {
            // Act
            motor.move({
              speed,
              direction,
              balance,
            });

            // Arrange
            const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

            // Assert
            lastCommand[1].should.be.within(0, 3, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
            lastCommand[4].should.be.within(0, 3, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);

            // Assert
            lastCommand[2].should.be.within(0, 255, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
            lastCommand[5].should.be.within(0, 255, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);

            // Assert
            lastCommand[3].should.be.within(0, 2, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
            lastCommand[6].should.be.within(0, 2, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
          }
        }
      }).timeout(10000);
    });
  });

  describe('test cases', () => {
    it('should send [7, 3, 255, 2, 3, 255, 2] if {speed: 100, direction: 2, balance: 0}', () => {
      // Act
      motor.move({
        speed: 100,
        direction: 2,
        balance: 0,
      });

      // Arrange
      const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

      // Assert command
      lastCommand[0].should.equal(7);

      // Assert left motor
      lastCommand[1].should.equal(3);
      lastCommand[2].should.equal(255);
      lastCommand[3].should.equal(2);

      // Assert right motor
      lastCommand[4].should.equal(3);
      lastCommand[5].should.equal(255);
      lastCommand[6].should.equal(2);
    });

    it('should send [7, 0, 0, 2, 3, 255, 2] if {speed: 100, direction: 2, balance: -100}', () => {
      // Act
      motor.move({
        speed: 100,
        direction: 2,
        balance: -100,
      });

      // Arrange
      const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

      // Assert command
      lastCommand[0].should.equal(7);

      // Assert left motor
      lastCommand[1].should.equal(0);
      lastCommand[2].should.equal(0);
      lastCommand[3].should.equal(2);

      // Assert right motor
      lastCommand[4].should.equal(3);
      lastCommand[5].should.equal(255);
      lastCommand[6].should.equal(2);
    });

    it('should send [7, 0, 0, 2, 3, 255, 2] if {speed: 100, direction: 2, balance: 100}', () => {
      // Act
      motor.move({
        speed: 100,
        direction: 2,
        balance: 100,
      });

      // Arrange
      const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

      // Assert command
      lastCommand[0].should.equal(7);

      // Assert left motor
      lastCommand[1].should.equal(3);
      lastCommand[2].should.equal(255);
      lastCommand[3].should.equal(2);

      // Assert right motor
      lastCommand[4].should.equal(0);
      lastCommand[5].should.equal(0);
      lastCommand[6].should.equal(2);
    });

    it('should send [7, 1, 0, 2, 3, 255, 2] if {speed: 100, direction: 2, balance: -75}', () => {
      // Act
      motor.move({
        speed: 100,
        direction: 2,
        balance: -75,
      });

      // Arrange
      const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

      // Assert command
      lastCommand[0].should.equal(7);

      // Assert left motor
      lastCommand[1].should.equal(1);
      lastCommand[2].should.equal(0);
      lastCommand[3].should.equal(2);

      // Assert right motor
      lastCommand[4].should.equal(3);
      lastCommand[5].should.equal(255);
      lastCommand[6].should.equal(2);
    });

    it('should send [7, 3, 255, 2, 1, 0, 2] if {speed: 100, direction: 2, balance: 75}', () => {
      // Act
      motor.move({
        speed: 100,
        direction: 2,
        balance: 75,
      });

      // Arrange
      const lastCommand = motor.wire.write_history[motor.wire.write_history.length - 1];

      // Assert command
      lastCommand[0].should.equal(7);

      // Assert left motor
      lastCommand[1].should.equal(3);
      lastCommand[2].should.equal(255);
      lastCommand[3].should.equal(2);

      // Assert right motor
      lastCommand[4].should.equal(1);
      lastCommand[5].should.equal(0);
      lastCommand[6].should.equal(2);
    });
  });
};
