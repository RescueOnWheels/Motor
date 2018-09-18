const Motor = require('./index.js');

const wheel = new Motor();

try {
  setTimeout(() => {
    console.log("Going forwards");
    wheel.Forward(100);
    setTimeout(() => {
      console.log("Rotating to the right");
      wheel.Right(100);
      setTimeout(() => {
        console.log("Rotating to the left");        
        wheel.Left(100);
        setTimeout(() => {
          console.log("Going backwards");
          wheel.Backwards(100);
        }, 3000);
      }, 3000);
    }, 3000);
  }, 3000);
} catch (error) {
  wheel.Stop();
}

wheel.Stop();
