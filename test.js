const wheel = require('./');

/**
 * Function which makes it possible to use sleep.
 *
 * @function
 * @param {Number} milliseconds - The amount of zzzzz's.
 * @returns {undefined}
 */
function sleep(milliseconds) {
  const start = new Date().getTime();
  for (let i = 0; i < 1e7; i += 1) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

try {
  console.log('Slide to the left *clap clap*');
  wheel.Left();
  sleep(2000);

  console.log('Slide tot he right *clap clap*');
  wheel.Right();
  sleep(2000);

  console.log('Move back real smooth');
  wheel.Backwards();
  sleep(2000);

  console.log('https://www.youtube.com/watch?v=2k0SmqbBIpQ');
  wheel.Stop();
} catch (error) {
  console.log('Error I guess');
  console.log(error);
  wheel.Stop();
} finally {
  console.log('Finally stopping');
  wheel.Stop();
}
