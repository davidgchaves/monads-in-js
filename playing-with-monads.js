// 01 - sine and cube are pure functions

// sine :: Number -> Number
var sine = function(x) { return Math.sin(x); }

// cube :: Number -> Number
var cube = function(x) { return x*x*x; }


// 02 - manually composing sine and cube

sine(cube(2));

