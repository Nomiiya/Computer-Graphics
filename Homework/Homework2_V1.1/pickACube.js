
var canvas;
var gl;

var NumVertices  = 36;

<<<<<<< HEAD
var points = []; // Handles the point
var colors = []; // Handles the colors

// Handles the axis
=======
var points = [];
var colors = [];

>>>>>>> 5de31a7b41d5313e6452d4d6689af872ec79ef77
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
<<<<<<< HEAD
var theta = [ 0, 0, 0 ];

var thetaLoc;

=======

var axis2 = 1;

var theta = [ 0, 0, 0 ];
var beta = [20, 0, 0];

var betaLoc;
var thetaLoc;

var rx;
var ry;
var rz;
var rxLoc;
var ryLoc;
var rzLoc;


>>>>>>> 5de31a7b41d5313e6452d4d6689af872ec79ef77
window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

<<<<<<< HEAD
    colorCube();
=======
    createCube();
>>>>>>> 5de31a7b41d5313e6452d4d6689af872ec79ef77

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

<<<<<<< HEAD
    //
    //  Load shaders and initialize attribute buffers
    //
=======
    //  Load shaders and initialize attribute buffers
>>>>>>> 5de31a7b41d5313e6452d4d6689af872ec79ef77
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
<<<<<<< HEAD

    render();
}

function colorCube()
{
  quad( 1, 0, 3, 2 );
  quad( 2, 3, 7, 6 );
  quad( 3, 0, 4, 7 );
  quad( 6, 5, 1, 2 );
  quad( 4, 5, 6, 7 );
  quad( 5, 4, 0, 1 );
}

var vertices = [
    vec3( -0.25, -0.25,  0.25 ),
    vec3( -0.25,  0.25,  0.25 ),
    vec3(  0.25,  0.25,  0.25 ),
    vec3(  0.25, -0.25,  0.25 ),
    vec3( -0.25, -0.25, -0.25 ),
    vec3( -0.25,  0.25, -0.25 ),
    vec3(  0.25,  0.25, -0.25 ),
    vec3(  0.25, -0.25, -0.25 )
];

var vertexColors = [
    [ 0.0, 0.0, 0.0, 1.0 ],  // black
    [ 1.0, 0.0, 0.0, 1.0 ],  // red
    [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
    [ 0.0, 1.0, 0.0, 1.0 ],  // green
    [ 0.0, 0.0, 1.0, 1.0 ],  // blue
    [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
    [ 0.5, 1.0, 0.5, 1.0 ],  // white
    [ 0.0, 1.0, 1.0, 1.0 ]   // cyan
];

function quad(a, b, c, d)
{
    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    //vertex color assigned by the index of the vertex

    var indices = [ a, b, c, a, c, d ];

    console.log("indices = ",indices);

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        // for solid colored faces use
        colors.push(vertexColors[a]);

=======
    betaLoc = gl.getUniformLocation(program, "beta");
    rxLoc = gl.getUniformLocation(program, "rx");
    ryLoc = gl.getUniformLocation(program, "ry");
    rzLoc = gl.getUniformLocation(program, "rz");
    render();
}

var vertices = [
  vec3( -0.5, -0.5,  0.5 ),
  vec3( -0.5,  0.5,  0.5 ),
  vec3(  0.5,  0.5,  0.5 ),
  vec3(  0.5, -0.5,  0.5 ),
  vec3( -0.5, -0.5, -0.5 ),
  vec3( -0.5,  0.5, -0.5 ),
  vec3(  0.5,  0.5, -0.5 ),
  vec3(  0.5, -0.5, -0.5 )
];

function createCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function quad(a, b, c, d)
{

    // We need to partition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    //vertex color assigned by the index of the vertex

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 1.0, 1.0, 1.0, 1.0 ],  // white
        [ 0.0, 1.0, 1.0, 1.0 ]   // cyan
    ];
    var indices = [ a, b, c, a, c, d ];

    //console.log("CreateCube: indices = ",indices);

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
		    colors.push(vertexColors[a]);
>>>>>>> 5de31a7b41d5313e6452d4d6689af872ec79ef77
    }
}
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  

    theta[axis] += 0.2;
    //console.log("theta = ",theta);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

<<<<<<< HEAD
=======

    beta[1] += 0.2;
    //console.log("beta = ",beta);
    gl.uniform3fv(betaLoc, beta);
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    //gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
    //gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
>>>>>>> 5de31a7b41d5313e6452d4d6689af872ec79ef77
    requestAnimFrame( render );
}
