const Motor = require('./index.js');

const wheel = new Motor();

try {
    setTimeout(() => {
        wheel.Forward();
        setTimeout(() => {
            wheel.Boost();    
            setTimeout(() => {
                wheel.Stop();
            },1500);
        },1500);
    },10000);
} catch (error) {
    wheel.Stop();
}

wheel.Stop();