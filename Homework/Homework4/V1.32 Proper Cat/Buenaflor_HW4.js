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

var animate = false;
var delay = 20;

// ================================================== 
//             Phong Illumination
// ==================================================

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
// Translation var FLL
var rotFLL= 1;
var raisedFLL = false;

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
// Back Leg Translate
var rotBLL = 1;
var raisedBLL = false;

// BRL
var backRightLegID = 4;
var BRLHeight = 1.0;
var BRLWidth = 0.5;
var BRLColor = vec4(0.4, 0.6, 1.0, 1.0);

var legColor = vec4( 0.6, 0.8 , 1.0, 1.0);


// Tail
var tailID = 5;
var tailHeight = 1;
var tailWidth = 1;
// Tail2
var tail2ID = 6;
var tail2Height =0.7;
var tail2Width = 0.5;
var tailColor = vec4( 0.4, 0.4, 1.0, 1.0);
// Tail Translate
var rotTail = 1;


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
  // Front
 vec4(-1.0, -0.5, 0.3, 1.0), // Top Left  0
 vec4(-1.0, -0.75, 0.3, 1.0), // Bottom left  1
 vec4(1.5, -0.5, 0.3, 1.0),  // Top Right  2
 vec4(1.5, -0.75, 0.3, 1.0),  // Bottom Right  3
 // Behind
 vec4(-1.0, -0.5, -0.3, 1.0), // Top Left  4
 vec4(-1.0, -0.75, -0.3, 1.0), // Bottom left  5
 vec4(1.5, -0.5, -0.3, 1.0),  // Top Right  6
 vec4(1.5, -0.75, -0.3, 1.0)  // Bottom Right  7
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
  instanceMatrix = mult(modelViewMatrix, translate(0.0, torsoHeight, 6.0) );
  instanceMatrix = mult(instanceMatrix, scale4( torsoWidth, torsoHeight, 2 * torsoWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(torsoColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function FLL(){
  instanceMatrix = mult(modelViewMatrix, translate(-0.75, (1.4 *  FLLHeight), -6.5) );
  instanceMatrix = mult(instanceMatrix, scale4( 1.5 * FLLWidth, 2 * FLLHeight, FLLWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(legColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function FRL(){
  instanceMatrix = mult(modelViewMatrix, translate(-0.75, (1.4*FRLHeight), -6.0) );
  instanceMatrix = mult(instanceMatrix, scale4( (1.5*FRLWidth), (2*FRLHeight), FRLWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(legColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function BLL(){
  instanceMatrix = mult(modelViewMatrix, translate(-0.75, (1.8*BLLHeight), -6.5) );
  instanceMatrix = mult(instanceMatrix, scale4( (1.5*BLLWidth), (2*BLLHeight), BLLWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(legColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function BRL(){
  instanceMatrix = mult(modelViewMatrix, translate(-0.75, (1.8*BRLHeight), -6.0) );
  instanceMatrix = mult(instanceMatrix, scale4( (1.5*BRLWidth), (2*BRLHeight), BRLWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(legColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function tail(){
  instanceMatrix = mult(modelViewMatrix, translate(1.0, 3*tailHeight, 6.0) );
  instanceMatrix = mult(instanceMatrix, scale4( tailWidth, tailHeight, tailWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(tailColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function tail2(){
  instanceMatrix = mult(modelViewMatrix, translate(1.5, 4*tail2Height, 6.0) );
  instanceMatrix = mult(instanceMatrix, scale4( tail2Width, tail2Height, tail2Width));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(tailColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function head(){
  instanceMatrix = mult(modelViewMatrix, translate(-1.0, 0.85*headHeight, 6.0) );
  instanceMatrix = mult(instanceMatrix, scale4( headWidth, headHeight, 5* headWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(headColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rotateLimb(ID){
  switch(ID){
    case frontLeftLegID:
      if(rotFLL < 3 && !raisedFLL){
        rotFLL += 0.05;
        if(rotFLL >= 3){
          raisedFLL = true;
        }
      }
      if(rotFLL > 1 && raisedFLL){
        rotFLL -= 0.05;
        if(rotFLL <= 1){
          raisedFLL = false;
        }
      }
      initNodes(frontLeftLegID);
      initNodes(frontRightLegID);
      break;
    case backLeftLegID:
      if(rotBLL > 0.3 && !raisedFLL){
        rotBLL -= 0.03;
        if(rotBLL <= -2){
          raisedBLL = true;
        }
      }
      if(rotBLL < 1 && raisedFLL){
        rotBLL += 0.03;
        if(rotBLL >= 1){
          raisedBLL = false;
        }
      }
      initNodes(backLeftLegID);
      initNodes(backRightLegID);
      break;
    case tailID:
      if(rotBLL > 0.3 && !raisedFLL){
        rotBLL -= 0.03;
        if(rotBLL <= -2){
          raisedBLL = true;
        }
      }
      if(rotBLL < 1 && raisedFLL){
        rotBLL += 0.03;
        if(rotBLL >= 1){
          raisedBLL = false;
        }
      }
      initNodes(backLeftLegID);
      initNodes(backRightLegID);
      break;
  }
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
    m = translate((torsoWidth + FLLWidth * -0.2 ), (1.5*FLLHeight), -1.0);
  	m = mult(m, rotate(theta[frontLeftLegID], 1, rotFLL, 0));
    figure[frontLeftLegID] = createNode( m, FLL, frontRightLegID, null );
    break;
  case frontRightLegID:
    m = translate((torsoWidth + FRLWidth * -0.2 ), (1.5*FRLHeight), 0.5);
    m = mult(m, rotate(theta[frontRightLegID], 1, rotFLL, 0));
    figure[frontRightLegID] = createNode( m, FRL, backLeftLegID, null );
    break;
  case backLeftLegID:
    m = translate(-(torsoWidth + BLLWidth * 0.2), (1.5*BLLHeight), -1.0);
    m = mult(m, rotate(theta[backLeftLegID], 1, rotBLL, 0));
    figure[backLeftLegID] = createNode( m, BLL, backRightLegID, null );
    break;
  case backRightLegID:
    m = translate(-(torsoWidth + BRLWidth * 0.2), (1.5*BRLHeight), 0.5);
    m = mult(m, rotate(theta[backRightLegID], 1, rotBLL, 0));
    figure[backRightLegID] = createNode( m, BRL, tailID, null );
    break;
  case tailID:
    m = translate(-(torsoWidth + tailWidth*2), (-0.5*tailHeight), 0.0);
    m = mult(m, rotate(theta[tailID], 1, 0, 0));
    figure[tailID] = createNode( m, tail, headID, null );
    break;
  case headID:
    m = translate((torsoWidth + headWidth*3), (0.3 * headHeight), 0.0);
    m = mult(m, rotate(theta[headID], 1.1, 0, 0));
    figure[headID] = createNode( m, head, null, null );
    break;
  }
}
//===================================================


// ==================================================
//               lookAt Functions
// ==================================================
var eye, at, up;


// ==================================================
//               Plane Functions
// ==================================================
var planeHeight = 0.5;
var planeWidth = 3.5;
var planeColor = vec4(0.5, 0.5, 0.6, 1.0);

function plane(){
  instanceMatrix = mult(modelViewMatrix, translate(-1.5, planeHeight, 0) );
  instanceMatrix = mult(instanceMatrix, scale4( 1.8* planeWidth, 5 * planeHeight, 7* planeWidth));
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.uniform4fv(colorLoc, flatten(planeColor) );
  for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
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

  // ========== Eye Initialization ================
  at = vec3(0.0, 0.0, 0.0);
  up = vec3(0.0, 1.0, 0.0);
  eye = vec3(1.0,  1.0, 1.0);


  // ========== Shader Initialization ==============
  program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );  

  // ========== Buffer Initialization ==============
  instanceMatrix = mat4();
  projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
  modelViewMatrix = lookAt(eye, at, up) ;

  
  modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix) );
  gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),  false, flatten(projectionMatrix) );

  colorLoc = gl.getUniformLocation(program, "color");
  
  // ========== Item Creation ======================
  cube();
  // cubePlane();
 
  // ========== Buffer Initialization ==============
  vBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

  var vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( vPosition );

  // ========== Animate Function ================
  document.getElementById("animateCheckBox").onchange = function() {
    var checkBox = document.getElementById("animateCheckBox");
    if(checkBox.checked)
    {
      animate = true;
    }
    else{
      animate = false;
    }
  };

  // ============ Uniform Variables ================
  
  for(i=0; i<numNodes; i++) initNodes(i);
  render();
}

var render = function() {
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  gl.clearColor(0, 0, 0, 0.8);

  plane();
  traverse(torsoID);

  if(animate){
      theta[torsoID] += 1;
      // Translate the legs
      rotateLimb(frontLeftLegID);
      rotateLimb(backLeftLegID);
      
      // Tranlate Tail
      //rotateLimb(tailID);

      console.log("Animating :  " + theta[torsoID]);
      initNodes(torsoID);
  }

  setTimeout(function (){requestAnimFrame(render);}, delay);
}
