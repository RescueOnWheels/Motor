const Motor = require('./index.js');

const wheel = new Motor();

try {
  setTimeout(() => {
    wheel.Forward(100);
    setTimeout(() => {
      wheel.Stop();
    }, 10000);
  }, 5000);
} catch (error) {
  wheel.Stop();
}

wheel.Stop();
