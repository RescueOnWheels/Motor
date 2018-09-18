const Motor = require('./index.js');

const wheel = new Motor();

try {
  console.log("Do this");
  setTimeout(() => { wheel.Stop(); }, 3000);

} catch (error) {
  console.log("fak");
  console.log(error);
  wheel.Stop();

} finally {
  console.log("Finally stopping please");
  setTimeout(() => { wheel.Stop(); }, 3000);
} 