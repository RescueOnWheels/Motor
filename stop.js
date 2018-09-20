const wheel = require('./');

try {
  console.log('Do this');
  wheel.Stop();
} catch (error) {
  console.log('y u no work!?');
  console.log(error);
  wheel.Stop();
} finally {
  console.log('Finally stopping please');
  wheel.Stop();
}
