//
//CSE 470 HW 1 Explode!
//
/*
Written by: HW470:Mark Terence Buenaflor
Date: Jan 2019

Description:
This program ..... HW470: COMPLETE THIS. DESCRIBE WHAT YOU DID.
*/

var canvas;
var gl;

//store the vertices
//Each triplet represents one triangle
var vertices = [];
var theta = 0.0;
var thetaLoc;

//store a color for each vertex
var colors = [];

//HW470: control the explosion
//(Your variables here)


//HW470: control the redraw rate
var delay = 20;

// =============== function init ======================

// When the page is loaded into the browser, start webgl stuff
window.onload = function init()
{
	// notice that gl-canvas is specified in the html code
    canvas = document.getElementById( "gl-canvas" );

	// gl is a canvas object
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	// Track progress of the program with print statement
    console.log("Opened canvas");

    //HW470:
    // Define  data for object
	// See HW specs for number of vertices and parts required
	// Recommendation: each set of three points corresponds to a triangle.
	// DCH: I have used sval for scaling the object size if I am not
	// happy with my initial design. (Just an idea for you; no need to use.)
	//(During the explosion all geometry must remain in the window.)
    //
	var sval = 0.25;
    vertices = [
        vec2( sval, -sval ),// core
        vec2( 0.0, sval ),
        vec2( -sval, -sval )
    ];


	//HW470: Create colors for the core and outer parts
	// See HW specs for the number of colors needed
	for(var i=0; i < vertices.length; i++) {
		colors.push(vec3(0.0, 0.0, 1.0));
    colors.push(vec3(1.0, 1.0, 0.0));
    colors.push(vec3(1.0, 0.0, 1.0));
	};




	// HW470: Print the input vertices and colors to the console
	console.log("Input vertices and colors:");



    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
	// Background color to white
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Define shaders to use
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
	//
	// color buffer: create, bind, and load
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

	// Associate shader variable for  r,g,b color
	var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // vertex buffer: create, bind, load
    var vbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vbuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate shader variables for x,y vertices
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

	//HW470: associate shader explode variable ("Loc" variables defined here)


    console.log("Data loaded to GPU -- Now call render");

    render();
};


// =============== function render ======================

function render()
{
    // clear the screen
    gl.clear( gl.COLOR_BUFFER_BIT );

	//HW470: send uniform(s) to vertex shader


	//HW470: draw the object
	// You will need to change this to create the exploding outer parts effect
	// Hint: you will need more than one draw function call
  gl.drawArrays( gl.TRIANGLES, 0, vertices.length );
  gl.drawArrays( gl.POINT, 0 , 0);


	//re-render after delay
	setTimeout(function (){requestAnimFrame(render);}, delay);
}
