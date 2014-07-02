// 01 - sine and cube are pure functions

// sine :: Number -> Number
var sine = function(x) { return Math.sin(x); };

// cube :: Number -> Number
var cube = function(x) { return x*x*x; };


// 02 - manually composing sine and cube

sine(cube(2));


// 03 - compose, a function to encapsulate function composition

var compose = function(f, g) {
  return function(x) { return f(g(x)); };
};

var sineOfCube = compose(sine, cube);
sineOfCube(3);  // -> 0.956375928404503


// 04 - sineLog and cubeLog are pure functions

// sineLog :: Number -> (Number, String)
var sineLog = function(x) { return [Math.sin(x), "sineLog was called."]; };

// cubeLog :: Number -> (Number, String)
var cubeLog = function(x) { return [x*x*x, "cubeLog was called."]; };


// 05 - custom function to compose sineLog and cubeLog

var composeLoggable = function(f, g) {
  return function(x) {
    var gx = g(x),    // cubeLog(3)  -> [27, "cubeLog was called."]
        y  = gx[0],   //             -> 27
        s  = gx[1],   //             -> "cubeLog was called."
        fy = f(y),    // sineLog(27) -> [0.956, "sineLog was called."]
        z  = fy[0],   //             -> 0.956
        t  = fy[1];   //             -> "sineLog was called."

    return [z, s+t];
  };
};

var sineOfCubeLog = composeLoggable(sineLog, cubeLog);
sineOfCubeLog(3);  // -> [0.956375928404503, "cubeLog was called.sineLog was called."


// 06 - avoid custom 'composeLoggable' function -> use 'compose'

// A Writer Monad example: bind
// bind :: (Number -> (Number,String)) -> ((Number,String) -> (Number,String))
var bind = function(f) {
  return function(tuple) {
    var x  = tuple[0],
        s  = tuple[1],
        fx = f(x),
        y  = fx[0],
        t  = fx[1];

    return [y, s+t];
  };
};

// use bind to convert sineLog and cubeLog to use 'compose'
var sineOfCubeLogWithTuple = compose(bind(sineLog), bind(cubeLog));
sineOfCubeLogWithTuple([3, ""]);  // -> [0.956375928404503, "cubeLog was called.sineLog was called."

// PROBLEM with the 'bind' approach:
//   the functions take (Number, String) => Example: [3, ""]

