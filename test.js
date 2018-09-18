const Motor = require('./index.js');

const wheel = new Motor();

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

try {
  console.log("Do this");
  wheel.Left();
  sleep(2000);

  console.log("do more");
  wheel.Right();
  sleep(2000);

  console.log("retreat");
  wheel.Backwards();
  sleep(2000);

  console.log("hallo kutwereld<3");
  wheel.Stop();

} catch (error) {
  console.log("Error i guess");
  console.log(error);
  wheel.Stop();

} finally {
  console.log("Finally stopping please");
  wheel.Stop();
} 