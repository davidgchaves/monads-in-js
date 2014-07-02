// 01 - sine and cube are pure functions

// sine :: Number -> Number
var sine = function(x) { return Math.sin(x); }

// cube :: Number -> Number
var cube = function(x) { return x*x*x; }


// 02 - manually composing sine and cube

sine(cube(2));


// 03 - compose, a function to encapsulate function composition

var compose = function(f, g) {
  return function(x) { return f(g(x)); };
};

var sineOfCube = compose(sine, cube);
sineOfCube(3);  // -> 0.956375928404503
