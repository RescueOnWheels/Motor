function Motor() {

}

var i2c = require('i2c');
var address = 0x32;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

// Naar links draaien
Motor.prototype.Left = function() {
    var Left = [7,3,0xa5,1,3,0xa5,2]; 
    wire.write(Left, function(err) {
        console.log(err);
    });

}

// Naar rechts draaien
Motor.prototype.Right = function() {
    var Right = [7,3,0xa5,2,3,0xa5,1]; 
    wire.write(Right, function(err) {
        console.log(err);
    });

}

// Naar links rijden
Motor.prototype.LeftDrive = function() {
    var Left = [7,3,0x52,2,3,0xa5,2]; 
    wire.write(Left, function(err) {
        console.log(err);
    });

}

// Naar voren
Motor.prototype.Forward = function(direction) {
    direction += 100;

    var links = Math.round(255 - ((255 / 200) * direction));
    var rechts = 255 - links;
    var MForward = [7,3,links,2,3,rechts,2]; 
    wire.write(MForward, function(err) {
        console.log(err);
    });   
    
}

// Vol gas naar voren
Motor.prototype.Boost = function() {
    var BoostForward = [7,3,0xFF,2,3,0xFF,2]; 
    wire.write(BoostForward, function(err) {
        console.log(err);
    });   
    
}

// Stoppen
Motor.prototype.Stop = function() {
    var Stopping = [7,0,0,0,0,0,0]; 
    wire.write(Stopping, function(err) {
        console.log(err);
    });      

}


module.exports = Motor;