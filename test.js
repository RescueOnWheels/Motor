const Motor = require('./index.js');

const wheel = new Motor();

try {
    setTimeout(() => {
        wheel.Forward(-100);
        setTimeout(() => {
            wheel.Forward(0);    
            setTimeout(() => {
                wheel.Forward(100);
                setTimeout(() => {
                    wheel.Stop();
                },2000);
            },2000);
        },2000);
    },10000);
} catch (error) {
    wheel.Stop();
}

wheel.Stop();