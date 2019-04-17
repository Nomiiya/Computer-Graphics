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
var colorLoc;

var vBuffer;
var pointsArray = [];


var vertices = [
  vec4(0.0, 0.0, 0.0, 1.0),     // 0. Origin
  vec4(-7.0, 0.0, 0.5, 1.0),    // 1. Left Middle Point
  vec4(-8.0, -8.0, 0.5, 1.0),   // 2. Left Bottom Point
  vec4(7, 0.0, 0.5, 1.0),       // 3. Right Middle Point
  vec4(8.0, -8.0, 0.5, 1.0),    // 4. Right Bottom Point
];

// ================================================
//             Cat Hierarchal Items
// ================================================
var numNodes = 11;

// Changing theta can = z
var theta = [0, 180, 180, 180, 180, 0, 0, 0, 180, 180, 0];
var stack = [];
var figure = [];

for( var i=0; i<numNodes; i++) figure[i] = createNode(null, null, null, null);

// Parts ID

// Torso
var torsoID = 0;
var torsoHeight = 5.0;
var torsoWidth = 1.0;
var torsoColor = vec4(0.6, 0.1, 0.6, 0.6);

// Legs
// FLL
var frontLeftLegID = 1;
var FLLHeight = 1.0;
var FLLWidth = 0.5;
var FLLColor = vec4(0.0, 0.6, 1.0, 1.0);

// FRL
var frontRightLegID = 2;
var FRLHeight = 1.0;
var FRLWidth = 0.5;
var FRLColor = vec4(0.0, 0.6, 1.0, 1.0);
1
// BLL
var backLeftLegID = 3;
var BLLHeight = 1.0;
var BLLWidth = 0.5;
var BLLColor = vec4(0.4, 0.6, 1.0, 1.0);

// BRL
var backRightLegID = 4;
var BRLHeight = 1.0;
var BRLWidth = 0.5;
var BRLColor = vec4(0.4, 0.6, 1.0, 1.0);

var legColor = vec4( 0.6, 0.8 , 1.0, 1.0);


// Tail
var tailID = 5;
var tailHeight = 1;
var tailWidth = 0.5;
// Tail2
var tail2ID = 6;
var tail2Height =0.7;
var tail2Width = 0.5;
var tailColor = vec4( 0.4, 0.4, 1.0, 1.0);


// Head
var headID = 7;
var headHeight = 5;
var headWidth = 0.5;
var headColor = vec4(0.2, 0.4, 0.4, 0.5);

// Eyes
var eye1ID = 8;
var eye2ID = 9;
var eyeHeight = 0.5;
var eyeWidth = 0.1;
var eyeColor = vec4(0.1, 0.1, 0.1, 0.1);



function scale4(a, b, c) {
  var result = mat4();
  result[0][0] = a;
  result[1][1] = b;
  result[2][2] = c;
  return result;
}

function createNode(transform, render, sibling, child){
  var node = {
  transform: transform,
  render: render,
  sibling: sibling,
  child: child,
  }
  return node;
}

var catVertices = [
  // Torso
 vec4(-2.5, -0.5, 0.5, 1.0), // Top Left  0
 vec4(-2.5, -1.0, 0.5, 1.0), // Bottom left  1
 vec4(2.5, -0.5, 0.5, 1.0),  // Top Right  2
 vec4(2.5, -1.0, 0.5, 1.0),  // Bottom Right  3
 // Behind
 vec4(-2.5, -0.5, -0.5, 1.0), // Top Left  4
 vec4(-2.5, -1.0, -0.5, 1.0), // Bottom left  5
 vec4(2.5, -0.5, -0.5, 1.0),  // Top Right  6
 vec4(2.5, -1.0, -0.5, 1.0)  // Bottom Right  7
];

function quad(a, b, c, d) {
  pointsArray.push(catVertices[a]); 
  pointsArray.push(catVertices[b]); 
  pointsArray.push(catVertices[c]);     
  pointsArray.push(catVertices[d]);  
}


function cube()
{
 quad( 0, 1, 3, 2 ); // close side 
 quad( 2, 3, 7, 6 ); // right closure
 quad( 2, 0, 4, 6 ); // Top Side
 quad( 7, 6, 4, 5 ); // far side
 quad( 7, 5, 1, 3 ); // bottom
 quad( 5, 4, 0, 1 ); // left closure
  
}

function traverse(Id) {
  if(Id == null) return; 
  stack.push(modelViewMatrix);
  modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
  figure[Id].render();
  if(figure[Id].child != null) traverse(figure[Id].child); 
   modelViewMatrix = stack.pop();
  if(figure[Id].sibling != null) traverse(figure[Id].sibling); 
}

function torso(){
  instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*torsoHeight, 0.0) );
  instanceMatrix = mult(instanceMatrix, scale4( torsoWidth, torsoHeight, torsoWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(torsoColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function FLL(){
  instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*FLLHeight, 0.0) );
  instanceMatrix = mult(instanceMatrix, scale4( FLLWidth, FLLHeight, FLLWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(legColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function FRL(){
  instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*FRLHeight, 0.0) );
  instanceMatrix = mult(instanceMatrix, scale4( FRLWidth, FRLHeight, FRLWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(legColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function BLL(){
  instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*BLLHeight, 0.0) );
  instanceMatrix = mult(instanceMatrix, scale4( BLLWidth, BLLHeight, BLLWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(legColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function BRL(){
  instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*BRLHeight, 0.0) );
  instanceMatrix = mult(instanceMatrix, scale4( BRLWidth, BRLHeight, BRLWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(legColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function tail(){
  instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*tailHeight, 0.0) );
  instanceMatrix = mult(instanceMatrix, scale4( tailWidth, tailHeight, tailWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(tailColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function tail2(){
  instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*tail2Height, 0.0) );
  instanceMatrix = mult(instanceMatrix, scale4( tail2Width, tail2Height, tail2Width));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(tailColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function head(){
  instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*headHeight, 0.0) );
  instanceMatrix = mult(instanceMatrix, scale4( headWidth, headHeight, headWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(headColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function eye1(){
  instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*eyeHeight, 0.0) );
  instanceMatrix = mult(instanceMatrix, scale4( eyeWidth, eyeHeight, eyeWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(eyeColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

// ===============================
// Init Nodes, Starting States
// ===============================
function initNodes(ID){
  var m = mat4();
  switch(ID){
  case torsoID:
    m = rotate(theta[torsoID], 0, 1, 0 );
    figure[torsoID] =createNode( m, torso, null, frontLeftLegID);
    break;
  case frontLeftLegID:
    m = translate((torsoWidth + FLLWidth), (-2.5*FLLHeight), -0.75);
  	m = mult(m, rotate(theta[frontLeftLegID], 1, 1, 0));
    figure[frontLeftLegID] = createNode( m, FLL, frontRightLegID, null );
    break;
  case frontRightLegID:
    m = translate((torsoWidth + FRLWidth), (-2.5*FRLHeight), 0.75);
    m = mult(m, rotate(theta[frontRightLegID], 1, 1, 0));
    figure[frontRightLegID] = createNode( m, FRL, backLeftLegID, null );
    break;
  case backLeftLegID:
    m = translate(-(torsoWidth + BLLWidth), (-2.5*BLLHeight), -0.75);
    m = mult(m, rotate(theta[backLeftLegID], 1, 1, 0));
    figure[backLeftLegID] = createNode( m, BLL, backRightLegID, null );
    break;
  case backRightLegID:
    m = translate(-(torsoWidth + BRLWidth), (-2.5*BRLHeight), 0.75);
    m = mult(m, rotate(theta[backRightLegID], 1, 1, 0));
    figure[backRightLegID] = createNode( m, BRL, tailID, null );
    break;
  case tailID:
    m = translate(-(torsoWidth + tailWidth*3), (-0.5*tailHeight), 0.0);
    m = mult(m, rotate(theta[tailID], 1, 0, 0));
    figure[tailID] = createNode( m, tail, tail2ID, null );
    break;
  case tail2ID:
    m = translate(-(torsoWidth + tail2Width*6), (-0.5*tail2Height), 0.0);
    m = mult(m, rotate(theta[tail2ID], 1, 0, 0));
    figure[tail2ID] = createNode( m, tail2, headID, null );
    break;
  
  case headID:
    m = translate((torsoWidth + headWidth*3), (0.3 * headHeight), 0.0);
    m = mult(m, rotate(theta[headID], 1.1, 0, 0));
    figure[headID] = createNode( m, head, null, eye1ID );
    break;
  case eye1ID:
    m = translate((torsoWidth + headWidth* 0.3), (-1.2 * eyeHeight), -0.3);
    m = mult(m, rotate(theta[eye1ID], 1.1, 0, 0));
    figure[eye1ID] = createNode( m, eye1, null, null );
    break;  
  }
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
  instanceMatrix = mat4();
  projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
  modelViewMatrix = mat4();

  
  modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix) );
  gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),  false, flatten(projectionMatrix) );

  colorLoc = gl.getUniformLocation(program, "color");
  
  // ========== Item Creation ======================
  cube();
 
  // ========== Buffer Initialization ==============
  vBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

  var vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( vPosition );

  // ========== Slides for Testing ================
  document.getElementById("slider0").onchange = function() {
    theta[torsoID] = event.srcElement.value;
    console.log("Current theta:  " + event.srcElement.value);
    initNodes(torsoID);
  };


  // ============ Uniform Variables ================
  
  for(i=0; i<numNodes; i++) initNodes(i);
  render();
}

var render = function() {
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  gl.clearColor(0, 0, 0, 0.8);

  //Plane();
  traverse(torsoID);

  requestAnimFrame(render);
}
