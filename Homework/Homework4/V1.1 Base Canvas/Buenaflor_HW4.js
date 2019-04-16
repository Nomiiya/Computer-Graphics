//====================================================
//Mark Buenaflor: Homework 5 CSE470: Computer Graphics
//====================================================
var canvas;
var gl;
var program;

// ===== Shaders and Uniforms=========
var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc;
var modelViewLoc;
var colorLoc;

var vBuffer;
var pointsArray = [];
var colors = [];

var vertices = [
  vec4(0.0, 0.0, 0.0, 1.0),     // 0. Origin
  vec4(-7.0, 0.0, 0.5, 1.0),    // 1. Left Middle Point
  vec4(-15.0, -20.0, 0.5, 1.0), // 2. Left Bottom Point
  vec4(7, 0.0, 0.5, 1.0),       // 3. Right Middle Point
  vec4(15.0, -20.0, 0.5, 1.0)   // 4. Right Bottom Point
];

// ================================================== 
// Tri Function: Adds given vertices to points Array
// ==================================================
function tri(a, b, c){
  pointsArray.push(vertices[a]); 
  pointsArray.push(vertices[b]); 
  pointsArray.push(vertices[c]);
}


// ================================================
// Plane Function: Creates Bottom Plane For Wialking
// ================================================
var planeColor =[
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0)  
];

function Plane(){
  tri(1, 2, 3);
  gl.uniform4fv(colorLoc, flatten(planeColor[0]) );
  tri(3, 4, 2);
  gl.uniform4fv(colorLoc, flatten(planeColor[1]) );
  for(var i = 0; i < pointsArray.length; i++){
    console.log(pointsArray[i]);
  }
}

//========== Function Initialization ===============
window.onload = function init() 
{
  // ======== Canvas Initialization ==============
  canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert( "WebGL isn't available" ); }

  gl.viewport( 0, 0, canvas.width, canvas.height );
  gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
  gl.enable(gl.DEPTH_TEST);

  // ========== Shader Initialization ==============
  program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );  

  // ========== Buffer Initialization ==============
  projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
  modelViewMatrix = mat4();

  
  modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix) );
  gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),  false, flatten(projectionMatrix) );


  colorLoc = gl.getUniformLocation(program, "color");
  gl.uniform4fv(colorLoc, flatten(planeColor) );
  
  // ========== Item Creation ======================
  Plane();

   // ========== Buffer Initialization ==============
  vBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

  var vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( vPosition );


  // ============ Uniform Variables ================
  

  render();
}

var render = function() {
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  gl.clearColor(0, 0, 0, 0.8);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);

  requestAnimFrame(render);
}
