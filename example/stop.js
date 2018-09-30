const wheel = require('./../');

try {
  console.log('Deus Ex Machina');
  wheel.Stop();
} catch (error) {
  console.log('y u no work!?');
  console.log(error);
}
