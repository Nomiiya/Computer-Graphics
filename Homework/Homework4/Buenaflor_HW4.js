//====================================================
//Mark Buenaflor: Homework 5 CSE470: Computer Graphics
//====================================================
var canvas;
var gl;
var program;

// ===== Shaders and Uniforms=========
var modelViewMatrix, projectionMatrix;
var instanceMatrix;
var modelViewMatrixLoc;
var modelViewLoc;
var colorLoc;

var vBuffer;
var pointsArray = [];
var colors = [];

var vertices = [
  vec4(0.0, 0.0, 0.0, 1.0),     // 0. Origin
  vec4(-7.0, 0.0, 0.5, 1.0),    // 1. Left Middle Point
  vec4(-8.0, -8.0, 0.5, 1.0),   // 2. Left Bottom Point
  vec4(7, 0.0, 0.5, 1.0),       // 3. Right Middle Point
  vec4(8.0, -8.0, 0.5, 1.0),    // 4. Right Bottom Point
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
  //for(var i = 0; i < pointsArray.length; i++){
   // console.log(pointsArray[i]);
  //}
}

// ================================================
//             Cat Hierarchal Items
// ================================================
// Parts ID

// Torso
var torsoID = 0;
var torsoHeight = 5.0;
var torsoWitdh = 1.0;
var torsoColor = vec4(1.0, 1.0, 1.0, 1.0);

// Legs
// FLL
var frontLeftLegID = 1;
var fllLength = 1.0;
var fllWitdh = 0.5;

// FRL
var frontRightLegID = 2;
var FRLLength = 1.0;
var FRLWitdh = 0.5;

// BLL
var backLeftLegID = 3;
var BLLLength = 1.0;
var BLLWitdh = 0.5;

// BRL
var backRightLegID = 4;
var BRLLength = 1.0;
var BRLWitdh = 0.5;

var legColor = vec4( 0.6, 0.8 , 1.0, 1.0);


// Tail
var tailID = 5;
var tailLength = 1.5;
var tailWitdh = 0.75;
var tailColor = vec4( 0.4, 0.4, 1.0, 1.0);

var catVertices = [

];

function createNode(transform, render, sibling, child){
  var node = {
  transform: transform,
  render: render,
  sibling: sibling,
  child: child,
  }
  return node;
}

function quad(a, b, c, d) {
  pointsArray.push(vertices[a]); 
  pointsArray.push(vertices[b]); 
  pointsArray.push(vertices[c]);     
  pointsArray.push(vertices[d]);    
}


function cube()
{
 quad( 1, 0, 3, 2 );
 quad( 2, 3, 7, 6 );
 quad( 3, 0, 4, 7 );
 quad( 6, 5, 1, 2 );
 quad( 4, 5, 6, 7 );
 quad( 5, 4, 0, 1 );
}
//===================================================



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
