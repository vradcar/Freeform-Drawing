// some globals
var gl;
var theta = 0.5;
let mouse_down = false;
var canvas;
let x = 0;
let y = 0;

window.onload = function init() {
    canvas = document.getElementById( "myPics" );

	gl = initWebGL(canvas)
		
	// Add the event listeners for mousedown, mousemove, and mouseup
	myPics.addEventListener("mousedown", (e) => {
		x = e.offsetX;
		y = e.offsetY;
		mouse_down = true;
	});
	
	myPics.addEventListener("mousemove", (e) => {
		if (mouse_down) {
		drawLine(gl, x, y, e.offsetX, e.offsetY);
		x = e.offsetX;
		y = e.offsetY;
		}
	});
	
	window.addEventListener("mouseup", (e) => {
		if (mouse_down) {
		drawLine(gl, x, y, e.offsetX, e.offsetY);
		x = 0;
		y = 0;
		mouse_down = false;
		}
	});


	// canvas.addEventListener("mousedown", mouseDown);
	// canvas.addEventListener("mouseup", mouseUp);
    
	// // initialize webgl, returns gl context (handle to the drawing canvas)
	// gl = initWebGL(canvas)

	// // check for errors
    // if (!gl) { 
	// 	alert( "WebGL isn't available" ); 
	// }

    // // specify viewing surface geometry to display your drawings
    // gl.viewport(0, 0, canvas.width, canvas.height);

	// // clear the display with a background color 
	// // specified as R,G,B triplet in 0-1.0 range
    // gl.clearColor( 0.7, 0.7, 0.7, 1.0 );

    // //  Initialize and load shaders -- all work done in init_shaders.js
    // program = initShaders( gl, "vertex-shader", "fragment-shader" );

	// // make this the current shader program
    // gl.useProgram( program );

	// // Get a handle (address) to theta  - this is a uniform variable defined 
	// // by the user in the vertex shader, the second parameter should match
	// // exactly the name of the shader variable
    // thetaLoc = gl.getUniformLocation( program, "theta" );

	// // we are also going manipulate the vertex color, so get its location
	// colorLoc = gl.getUniformLocation(program, "vertColor");

	// // set an initial color for all vertices
	// gl.uniform4fv (colorLoc, [1., 0., 0., 1.])

	// // create a vertex buffer - this will hold all vertices
    // vBuffer = gl.createBuffer();

	// // get the vertices to generate a square shape
	// // let vertices = getSquareVertices();
	
	// let vertices = getMousePosition();
    // console.log(vertices)
	// // buffer calls to send vertex data to the shader
	// updateBuffers(vertices);

	// // render the square	
    // render();
};

function drawLine(context, x1, y1, x2, y2) {
	context.beginPath();
	context.strokeStyle = "black";
	context.lineWidth = 1;
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
	context.closePath();
}


function getMousePosition(event) {
    if (mouse_down) 
    {
        const rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left, y = event.clientY - rect.top;

        // convert to -1 to 1 range for webgl canvas coords with 
		// (-1, -1) as the lower left of the window
        x =  -1 + (x/canvas.width)*2.;
        y =   1 - (y/canvas.height)*2;

	    return [x, y];
    }
}

// canvas.addEventListener("mousemove", function(event) {
// 	getMousePosition(event);
//   });

function mouseDown() {
	mouse_down = true;
  }
  
function mouseUp() {
	mouse_down = false;
}


function updateBuffers(vertices) {
	// make the needed GL calls to tranfer vertices

	// bind the buffer, i.e. this becomes the current buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

	// transfer the data -- this is actually pretty inefficient!
	// flatten() function is defined in MV.js - this simply creates only
	// the vertex coordinate data array - all other metadata in Javascript
	// arrays should not be in the vertex buffer.
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	// Associate our shader variables with our data buffer
	// note: "vPosition" is a named buffer variable used in the vertex shader 
	// and is associated with vPosition here
	var vPosition = gl.getAttribLocation( program, "vPosition");

	// specify the format of the vertex data - here it is a float with
	// 2 coordinates per vertex - these are its attributes
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

	// enable the vertex attribute array 
	gl.enableVertexAttribArray(vPosition);

	// we will use a single color for all primitives and so we will directly set
	// the color in the GPU's fragment shader. If you do need to set individual
	// colors for each vertex, then you will need to send a color buffer, 
	// similar to the vertex buffer, with associated shader variables for color.
}

counter = 0;


function render() {
	// this is render loop

	// clear the display with the background color
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl_PointSize = 3;
	// rotate the big square by a small angle
	counter++;
	
	// send the theta value to the shader, where the rotation is
	// performed
	gl.uniform1f(thetaLoc, theta);

	// set the color to change it every 10 frames
	counter++;
	if (counter%10 == 0) {
		color_vals = [Math.random(), Math.random(), Math.random(), 1.];
	}

	// set the color in the shader
	gl.uniform4fv (colorLoc, color_vals)

	// draw the big square as 2 triangles starting slot 0
    gl.drawArrays(gl.POINTS, 0, 2);


    setTimeout(
        function (){requestAnimFrame(render);}, delay
    );
}
