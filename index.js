function Motor() {

}

var i2c = require('i2c');
var address = 0x32;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

// Rotating to the left
Motor.prototype.Left = function() {
    var Left = [7,3,0xa5,1,3,0xa5,2]; 
    wire.write(Left, function(err) {
        console.log(err);
    });

}

// Rotating to the right
Motor.prototype.Right = function() {
    var Right = [7,3,0xa5,2,3,0xa5,1]; 
    wire.write(Right, function(err) {
        console.log(err);
    });

}

// Driving to the left
Motor.prototype.LeftDrive = function() {
    var Left = [7,3,0x52,2,3,0xa5,2]; 
    wire.write(Left, function(err) {
        console.log(err);
    });

}

// Forwards
Motor.prototype.Forward = function(Direction) {
    Direction += 100;

    var Left = Math.round(255 - ((255 / 200) * Direction));
    var Right = 255 - Left;
    var Forward = [7,3,Left,2,3,Right,2]; 
    wire.write(Forward, function(err) {
        console.log(err);
    });   
    
}

// Full power forwards
Motor.prototype.Boost = function() {
    var BoostForward = [7,3,0xFF,2,3,0xFF,2]; 
    wire.write(BoostForward, function(err) {
        console.log(err);
    });   
    
}

// Stopping
Motor.prototype.Stop = function() {
    var Stopping = [7,0,0,0,0,0,0]; 
    wire.write(Stopping, function(err) {
        console.log(err);
    });      

}

module.exports = Motor;