function normalize(value, lower, upper, round = false) {
  if (round) {
    value = Math.round(value);
  }

  value = Math.max(value, lower);
  value = Math.min(value, upper);

  return value;
}

module.exports = normalize;
