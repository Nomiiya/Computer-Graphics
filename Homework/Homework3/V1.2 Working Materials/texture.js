var texSize = 64;
var image;

var texCoordsArray = [];

// original texture coords
var texCoord2 = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];

// magnify texture (make squares larger)
var texCoord1 = [
    vec2(0, 0),
    vec2(0, 0.5),
    vec2(0.5, 0.5),
    vec2(0.5, 0)
];
// extrapolate coords -- use wrap or clamped setting below
// default is repeat
var texCoord = [
    vec2(0, 0),
    vec2(0, 2.0),
    vec2(2.0, 2.0),
    vec2(2.0, 0)
];

// Chrome
var material1 = {
    ambient: vec4(0.25, 0.25, 0.25, 1.0),
    diffuse: vec4(0.4, 0.4, 0.4, 1.0),
    specular: vec4(0.774597, 0.774597, 0.774597 , 1.0),
    shininess: 0.6,
}

//EMERALD
var material2 = {
    ambient: vec4(0.0215, 0.1745, 0.0215, 1.0),
    diffuse: vec4(0.07568, 0.61424, 0.07568, 1.0),
    specular: vec4(0.633, 0.727811, 0.633, 1.0),
    shininess: 0.6,
}

// BLACK RUBBER
var material3 = {
    ambient: vec4( 0.5, 0.0,0.0, 1.0 ),
    diffuse: vec4( 0.5, 0.4, 0.4, 1.0 ),
    specular: vec4( 0.7, 0.04, 0.04, 1.0 ),
    shininess: .078125,
}
