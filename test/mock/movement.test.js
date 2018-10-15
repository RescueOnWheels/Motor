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
  describe('syntax', () => {
    it('should send an array with a length of \'7\'', () => {
      // Act
      motor.Movement({
        speed: 0,
        direction: 0,
        balance: 0,
      });

      // Assert
      motor.wire.write_history[motor.wire.write_history.length - 1].should.have.lengthOf(7);
    });

    it('should send command \'7\'', () => {
      // Act
      motor.Movement({
        speed: 0,
        direction: 0,
        balance: 0,
      });

      // Assert
      motor.wire.write_history[motor.wire.write_history.length - 1][0].should.equal(7);
    });
  });

  describe('input', () => {
    describe('speed', () => {
      it('p1H and p2H | should send a value equal to or greater than 0 and equal to or lower than 3', () => {
        // Arrange
        const direction = 0;
        const balance = 0;

        for (let speed = -1023; speed <= 1023; speed += 1) {
          // Act
          motor.Movement({
            speed,
            direction,
            balance,
          });

          // Assert
          motor.wire.write_history[motor.wire.write_history.length - 1][1].should.be.oneOf([0, 1, 2, 3], `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
          motor.wire.write_history[motor.wire.write_history.length - 1][4].should.be.oneOf([0, 1, 2, 3], `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
        }
      });

      it('p1L and p2L | should send a value equal to or greater than 0 and equal to or lower than 255', () => {
        // Arrange
        const direction = 0;
        const balance = 0;

        const range = [];
        for (let i = 0; i <= 255; i += 1) {
          range.push(i);
        }

        for (let speed = -1023; speed <= 1023; speed += 1) {
          // Act
          motor.Movement({
            speed,
            direction,
            balance,
          });

          // Assert
          motor.wire.write_history[motor.wire.write_history.length - 1][2].should.be.oneOf(range, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
          motor.wire.write_history[motor.wire.write_history.length - 1][5].should.be.oneOf(range, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
        }
      });
    });

    describe('direction', () => {
      it('should send a value equal to or greater than 0 and equal to or lower than 2', () => {
        // Arrange
        const speed = 0;
        const balance = 0;

        const range = [0, 1, 2];

        for (let direction = -10; direction < 10; direction += 1) {
          // Act
          motor.Movement({
            speed,
            direction,
            balance,
          });

          // Assert
          motor.wire.write_history[motor.wire.write_history.length - 1][3].should.be.oneOf(range, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
          motor.wire.write_history[motor.wire.write_history.length - 1][6].should.be.oneOf(range, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
        }
      });
    });

    describe('balance', () => {
      it('should stay within the limits of `speed` and `direction`', () => {
        // Arrange
        const rangeSpeedHigh = [0, 1, 2, 3];
        const rangeSpeedLow = [];
        const rangeDirection = [0, 1, 2];

        for (let i = 0; i <= 255; i += 1) {
          rangeSpeedLow.push(i);
        }

        for (let direction = 0; direction <= 2; direction += 1) {
          for (let speed = 0; speed <= 1023; speed += 32) {
            for (let balance = -256; balance < 256; balance += 32) {
              // Act
              motor.Movement({
                speed,
                direction,
                balance,
              });

              // Assert p1H and p2H
              motor.wire.write_history[motor.wire.write_history.length - 1][1].should.be.oneOf(rangeSpeedHigh, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
              motor.wire.write_history[motor.wire.write_history.length - 1][4].should.be.oneOf(rangeSpeedHigh, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);

              // Assert p1L and p2L
              motor.wire.write_history[motor.wire.write_history.length - 1][2].should.be.oneOf(rangeSpeedLow, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
              motor.wire.write_history[motor.wire.write_history.length - 1][5].should.be.oneOf(rangeSpeedLow, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);

              // Assert d1 and d2
              motor.wire.write_history[motor.wire.write_history.length - 1][3].should.be.oneOf(rangeDirection, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
              motor.wire.write_history[motor.wire.write_history.length - 1][6].should.be.oneOf(rangeDirection, `Values are: speed: ${speed}; direction: ${direction}; balance: ${balance}.`);
            }
          }
        }
      });
    });
  });

  describe('test cases', () => {
    it('should send [7, 3, 255, 2, 3, 255, 2] if {speed: 1023, direction:2, balance:0}', () => {
      // Act
      motor.Movement({
        speed: 1023,
        direction: 2,
        balance: 0,
      });

      // Assert command
      motor.wire.write_history[motor.wire.write_history.length - 1][0].should.equal(7);

      // Assert left motor
      motor.wire.write_history[motor.wire.write_history.length - 1][1].should.equal(3);
      motor.wire.write_history[motor.wire.write_history.length - 1][2].should.equal(255);
      motor.wire.write_history[motor.wire.write_history.length - 1][3].should.equal(2);

      // Assert right motor
      motor.wire.write_history[motor.wire.write_history.length - 1][4].should.equal(3);
      motor.wire.write_history[motor.wire.write_history.length - 1][5].should.equal(255);
      motor.wire.write_history[motor.wire.write_history.length - 1][6].should.equal(2);
    });

    it('should send [7, 3, 0, 2, 3, 255, 2] if {speed: 1023, direction:2, balance:-255}', () => {
      // Act
      motor.Movement({
        speed: 1023,
        direction: 2,
        balance: -255,
      });

      // Assert command
      motor.wire.write_history[motor.wire.write_history.length - 1][0].should.equal(7);

      // Assert left motor
      motor.wire.write_history[motor.wire.write_history.length - 1][1].should.equal(3);
      motor.wire.write_history[motor.wire.write_history.length - 1][2].should.equal(0);
      motor.wire.write_history[motor.wire.write_history.length - 1][3].should.equal(2);

      // Assert right motor
      motor.wire.write_history[motor.wire.write_history.length - 1][4].should.equal(3);
      motor.wire.write_history[motor.wire.write_history.length - 1][5].should.equal(255);
      motor.wire.write_history[motor.wire.write_history.length - 1][6].should.equal(2);
    });

    it('should send [7, 3, 255, 2, 3, 0, 2] if {speed: 1023, direction:2, balance:255}', () => {
      // Act
      motor.Movement({
        speed: 1023,
        direction: 2,
        balance: 255,
      });

      // Assert command
      motor.wire.write_history[motor.wire.write_history.length - 1][0].should.equal(7);

      // Assert left motor
      motor.wire.write_history[motor.wire.write_history.length - 1][1].should.equal(3);
      motor.wire.write_history[motor.wire.write_history.length - 1][2].should.equal(255);
      motor.wire.write_history[motor.wire.write_history.length - 1][3].should.equal(2);

      // Assert right motor
      motor.wire.write_history[motor.wire.write_history.length - 1][4].should.equal(3);
      motor.wire.write_history[motor.wire.write_history.length - 1][5].should.equal(0);
      motor.wire.write_history[motor.wire.write_history.length - 1][6].should.equal(2);
    });
  });
};
