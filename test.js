const Motor = require('./index.js');

const wheel = new Motor();

try {
    setTimeout(() => {
        wheel.Forward();
        setTimeout(() => {
            wheel.LeftDrive();    
            setTimeout(() => {
                wheel.Stop();
            },2000);
        },2000);
    },10000);
} catch (error) {
    wheel.Stop();
}

wheel.Stop();