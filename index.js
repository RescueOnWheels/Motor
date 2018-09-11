function Motor() {

}

var i2c = require('i2c');
var address = 0x32;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

Motor.prototype.Left = function() {
    console.log("Turning left");

    var LSlow = [7,3,0xa5,1,3,0xa5,2]; 
    wire.write(LSlow, function(err) {
        console.log(err);
    });

}

Motor.prototype.Forward = function() {
    console.log("Going forward");

    var MForward = [7,3,0xa5,2,3,0xa5,2]; 
    wire.write(Mforward, function(err) {
        console.log(err);
    });   
    
}

Motor.prototype.Stop = function() {
    console.log("Stopping");

    var Stopping = [7,0,0,0,0,0,0]; 
    wire.write(Stopping, function(err) {
        console.log(err);
    });      
    
}


module.exports = Motor;