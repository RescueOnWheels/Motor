/**
 * (Simple) Deep compare of two arrays.
 *
 * @param {Array} arr1 - First array.
 * @param {Array} arr2 - Second array.
 */
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

module.exports = arraysEqual;
