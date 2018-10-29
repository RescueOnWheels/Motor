/* Packages */
const chai = require('chai');

/* Test target */
const arraysEqual = require('./../../../lib/helpers/arraysEqual');

chai.should();

module.exports = () => {
  // Arrange
  let areEqual = false;

  describe('output', () => {
    it('should return a boolean.', () => {
      // Arrange
      const array1 = [];
      const array2 = [];

      // Act
      areEqual = arraysEqual(array1, array2);

      // Assert
      areEqual.should.be.a('boolean');
    });
  });

  describe('test cases', () => {
    it('should return `true` if both arrays are empty.', () => {
      // Arrange
      const array1 = [];
      const array2 = [];

      // Act
      areEqual = arraysEqual(array1, array2);

      // Assert
      areEqual.should.equal(true);
    });

    it('should return `false` if the length of the arrays are not equal.', () => {
      // Arrange
      const array1 = [1];
      const array2 = [1, 2];

      // Act
      areEqual = arraysEqual(array1, array2);

      // Assert
      areEqual.should.equal(false);
    });

    it('should return `false` if the contens of the arrays are not equal.', () => {
      // Arrange
      const array1 = [2, 1];
      const array2 = [1, 2];

      // Act
      areEqual = arraysEqual(array1, array2);

      // Assert
      areEqual.should.equal(false);
    });
  });
};
