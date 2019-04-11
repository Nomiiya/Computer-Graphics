//===========================================
//============ Mark Buenaflor================
//===========================================


//=====================================================
// =========== BASIC SHAPE FROM SHADED ================
//=====================================================
/*
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

		// normalize 3d vectora
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
  //divideTriangle(a, b, c, n);
  divideTriangle(d, c, b, n);
  divideTriangle(a, d, b, n);
  //divideTriangle(a, b, a, n);
	//comment out next line to create an open object
  //divideTriangle(a, c, d, n);
}*/
function quad() {
  var va = vec3(-1.0, 1.0, 0);
  var vb = vec3(-0.9, 1.0, 0.0);
  var vc = vec3(-1.0, -0.5, 0.0);
  normalsArray.push(va);
  texCoordsArray.push(texCoord[0]);
  normalsArray.push(vb);
  texCoordsArray.push(texCoord[1]);
  normalsArray.push(vc);
  texCoordsArray.push(texCoord[2]);

  pointsArray.push(va);
  texCoordsArray.push(texCoord[0]);
  pointsArray.push(vb);
  texCoordsArray.push(texCoord[2]);
  pointsArray.push(vc);
  texCoordsArray.push(texCoord[3]);

  index += 3;

  va = vec3(-0.9, -0.5, 0.0);
  vb = vec3(-0.9, 1.0, 0.0);
  vc = vec3(-1.0, -0.5, 0.0)
  normalsArray.push(va);
  texCoordsArray.push(texCoord[0]);
  normalsArray.push(vb);
  texCoordsArray.push(texCoord[1]);
  normalsArray.push(vc);
  texCoordsArray.push(texCoord[2]);

  pointsArray.push(va);
  texCoordsArray.push(texCoord[0]);
  pointsArray.push(vb);
  texCoordsArray.push(texCoord[2]);
  pointsArray.push(vc);
  texCoordsArray.push(texCoord[3]);
  index += 3;
}
var omega = [30, 30, 30];

function rotateQuad(){
  normalsArray = normalsArray * vec3(Math.cos(theta), 0.001, Math.sin(theta));
}
