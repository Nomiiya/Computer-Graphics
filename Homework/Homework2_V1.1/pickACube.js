// Global Variables
var canvas;
var gl;

var NumVertices = 36;

var points = []; // handles the vertices of the triangles we are making
var colors = []; // handles the colors for the triangles

// Axis max
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [0, 0, 0]; // This handles the rotation of the cubes
var thetaLoc;

window.onload = function init(){
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if ( !gl ) { alert( "WebGL isn't available" ); }

  // Call CreateCube
  createCube();

  // Standard Initialization
  gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
  var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");

    // Call render here
    render();
}

function createCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );

}

// Variables for quad
// CreateCubeHW2.js
// These are the cube vertices and cube definition that must be used for HW 2.
// TO DO for HW:
// Add per face color: each face must have a unique color
//
var vertices = [
	vec3( 0.0, 0.0,  0.0),
	vec3( 0.0, 1.0,  0.0 ),
	vec3( 1.0, 1.0,  0.0 ),
	vec3( 1.0, 0.0,  0.0 ),
	vec3( 0.0, 0.0, -1.0 ),
	vec3( 0.0, 1.0, -1.0),
	vec3( 1.0, 1.0, -1.0 ),
	vec3( 1.0, 0.0, -1.0 )
];


var oneColor = [ 0.0, 0.5, 0.2, 1.0 ];

function quad(a, b, c, d){
  // We need to partition the quad into two triangles in order for
  // WebGL to be able to render it.  In this case, we create two
  // triangles from the quad indices

  //vertex color assigned by the index of the vertex

  var indices = [ a, b, c, a, c, d ];

  //console.log("CreateCube: indices = ",indices);

  for ( var i = 0; i < indices.length; ++i ) {
      cubeVertices.push( vertices[indices[i]] );
      cubeColor.push(oneColor);
  }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 0.2;
    console.log("theta = ",theta);

    gl.uniform3fv(thetaLoc, theta);

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

	// This works in cubev because of the data structure
	// Would have to send vertices down differently to make it work here.
	//gl.drawArrays( gl.LINE_LOOP, 0, 4 );
	//gl.drawArrays( gl.LINE_LOOP, 4, 4 );

    requestAnimFrame( render );
}
