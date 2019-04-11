function triangle(a, b, c) {

     normalsArray.push(a);
		 texCoordsArray.push(texCoord[0]);
     normalsArray.push(b);
		 texCoordsArray.push(texCoord[1]);
     normalsArray.push(c);
		 texCoordsArray.push(texCoord[2]);

     pointsArray.push(a);
		 texCoordsArray.push(texCoord[0]);
     pointsArray.push(b);
		 texCoordsArray.push(texCoord[2]);
     pointsArray.push(c);
		 texCoordsArray.push(texCoord[3]);

     index += 3;
}

function divideTriangle(a, b, c, count) {
    if ( count > 0 ) {

        var ab = mix( a, b, 0.5);
        var ac = mix( a, c, 0.5);
        var bc = mix( b, c, 0.5);

		// normalize 3d vector
        ab = normalize(ab, false);
        ac = normalize(ac, false);
        bc = normalize(bc, false);

        divideTriangle( a, ab, ac, count - 1 );
        divideTriangle( ab, b, bc, count - 1 );
        divideTriangle( bc, c, ac, count - 1 );
        divideTriangle( ab, bc, ac, count - 1 );
    }
    else {
        triangle( a, b, c );
    }
}

function tetrahedron(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
		//comment out next line to create an open object
    //divideTriangle(a, c, d, n);
		//divideTriangle(a, a, a, n);
}


// ========================== CYLINDER ADDITIONS =========================
var cylinderCruve = 1;
var cylinderDerivative = 0;

var sval = 3;
var vertices = [
  vec2( sval, -sval ),// core
  vec2( 0.0, sval ),
  vec2( -sval, -sval ),
]

function createCylinder(){
  pointsArray.push(vertices[0]);
  pointsArray.push(vertices[1]);
  pointsArray.push(vertices[2]);
}
