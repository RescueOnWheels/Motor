/**
 * Return a value that match the specified bounds.
 *
 * @param {Number} value - Value to normalize.
 * @param {Number} lower - Lower limit.
 * @param {Number} upper - Upper limit.
 * @param {Boolean} round - Round the value.
 */
function normalize(value, lower, upper, round = false) {
  if (round) {
    value = Math.round(value);
  }

  value = Math.max(value, lower);
  value = Math.min(value, upper);

  return value;
}

module.exports = normalize;
