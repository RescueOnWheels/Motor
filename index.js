function Motor() {

}

var i2c = require('i2c');
var address = 0x32;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

function wireWrite(side) {
    wire.write(side, (err) => {
        if (err) {
            console.log(err);    
        }
    });
}

// Rotating to the left
Motor.prototype.Left = function() {
    var left = [7,3,0xa5,1,3,0xa5,2]; 
    wireWrite(left);
}

// Rotating to the right
Motor.prototype.Right = function() {
    var right = [7,3,0xa5,2,3,0xa5,1]; 
    wireWrite(right);
}

// Driving to the left
Motor.prototype.LeftDrive = function() {
    var left = [7,3,0x52,2,3,0xa5,2]; 
    wireWrite(left);
}

// Forwards
Motor.prototype.Forward = function(direction) {
    direction += 100;

    var left = Math.round(255 - ((255 / 200) * direction));
    var right = 255 - left;
    var forward = [7,3,left,2,3,right,2]; 
    wireWrite(forward);
}

// Full power forwards
Motor.prototype.Boost = function() {
    var boostForward = [7,3,0xFF,2,3,0xFF,2]; 
    wireWrite(boostForward);
}

// Stopping
Motor.prototype.Stop = function() {
    var stopping = [7,0,0,0,0,0,0]; 
    wireWrite(stopping);
}

module.exports = Motor;