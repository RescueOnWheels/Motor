/* Helpers */
const arraysEqual = require('./arraysEqual');

function isDuplicate(instruction, history) {
  let isDupe = false;

  for (let i = history.length - 1; i >= 0; i -= 1) {
    const prevInstruction = history[i];

    if (instruction[0] !== prevInstruction[0]) {
      continue;
    }

    if (arraysEqual(instruction, prevInstruction)) {
      isDupe = true;
    }

    break;
  }

  return isDupe;
}

module.exports = isDuplicate;
