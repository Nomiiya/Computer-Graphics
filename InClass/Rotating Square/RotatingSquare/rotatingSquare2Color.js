//
// This program demonstrates:
// -- animation
// -- event handling
// -- drawing different primitives (triangle strip, line, point)
// -- using different colors for each primitive
//
//
var gl;

// initialize the object to not be rotated
var theta = 0.0;
var thetaLoc;

// set the rotation speed with delay; direction is clockwise/counter-clockwise
var delay = 100;
var direction = true;

// store the colors for the GPU
var colors = [];

// allow rotation thru colors
var baseColors = [
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0),
        vec3(1.0, 1.0, 0.0)
    ];
var numcolors = 4;
var colorindex = 0;


window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertices = [
        vec2(  0,  1),
        vec2(  1,  0 ),
        vec2( -1,  0 ),
        vec2(  0, -1 ),
    ];

	// initialize the colors for the square (using integer index into baseColors array)
	// also init color for black point and green line segment
	// (This function called again from event handler "ChangeColor"
	setcolors(colorindex);




    // Load the data into the GPU

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);


	// do same for colors
	var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );



	// associate shader theta variable
    thetaLoc = gl.getUniformLocation( program, "theta" );

    // Initialize event handlers
    document.getElementById("Direction").onclick = function () {
        direction = !direction;
    };

	document.getElementById("ChangeColor").onclick = function () {
        colorindex += 1;
        if(colorindex > numcolors-1) {colorindex = 0};
	   setcolors(colorindex);
	   gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    };


    document.getElementById("Controls" ).onclick = function(event) {
        switch( event.srcElement.index ) {
          case 0:
            direction = !direction;
            break;
         case 1:
            delay /= 2.0;
            break;
         case 2:
            delay *= 2.0;
            break;
       }
    };

    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch(key) {
          case '1':
            direction = !direction;
            break;

          case '2':
            delay /= 2.0;
            break;

          case '3':
            delay *= 2.0;
            break;
        }
    };

	window.onresize = function() {
		var min = innerWidth;
		if(innerHeight < min) {
			min = innerHeight;
		}
		console.log("onresize");
		console.log("canvas width = ",canvas.width,"  height = ",canvas.height);
		console.log("innerWidth = ",innerWidth,"  innerHeight = ",innerHeight);
		console.log("min = ",min);

		if(min < canvas.width || min < canvas.height) {
			gl.viewport(0, canvas.height - min, min, min);
			console.log("set viewport to 0  ",canvas.height - min, "  ",min," ",min);
		}

	};


    render();
};



// Set the color for each vertex sent to the GPU.
//
function setcolors(colorindex)
{
	// colors for the vertices of the square
colors = [
        baseColors[colorindex],
        baseColors[colorindex],
        baseColors[colorindex],
        baseColors[colorindex],
vec3(0.0, 0.0, 0.0),  // point color
vec3(0.2, 0.9, 0.3), // line color
vec3(0.2, 0.9, 0.3)
    ];
}





// Draw continuously
//
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

	// update the angle of rotation and send to vertex shader
    theta += (direction ? 0.01 : -0.01);
    gl.uniform1f(thetaLoc, theta);

	// Using points 0 ... 3, draw triangle strip
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // Draw some other primitives


//    gl.drawArrays(gl.POINTS, 0, 1); // one point on square
//    gl.drawArrays(gl.POINTS, 4, 1); // new point
  //  gl.drawArrays(gl.POINTS, 5, 1);// line vertices
  //  gl.drawArrays(gl.POINTS, 6, 1);
  //  gl.drawArrays(gl.LINES, 5, 2);   // line segment



	 // Play: comment out the other draw commands and uncomment out this one
    // Here is an example of something we don't want.
	// If we want to draw a polyline of one color, we need to have the vertices and colors corresponding in the GPU.
	// The set-up here does not support this ...
	// This shows that we need to organize the vertex and color buffers,
	// which might involve duplicating the vertices with the desired color. (There is more more than one way to fix this.)

    //gl.drawArrays(gl.LINES, 0, 6);   // line to all points


    setTimeout(
        function (){requestAnimFrame(render);}, delay
    );
}
