// When true, moving the mouse draws on the canvas
var gl;

let isDrawing = false;
let x = 0;
let y = 0;

const canvas = document.getElementById("gl-canvas");
const context = canvas.getContext("2d");

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
canvas.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

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