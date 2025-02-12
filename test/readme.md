### Overview
This WebGL program allows users to draw points on a canvas by clicking and dragging the mouse. The points are stored in arrays and rendered in real-time using WebGL. The code makes use of WebGL buffers and shaders to handle the rendering of the points.

### Key Concepts and Functions

#### 1. **Initialization (`init()` function)**
   - **Canvas and WebGL Context**: 
     - The `canvas` is initialized by fetching element with `id="gl-canvas"`.
     - The WebGL rendering context (`gl`) is obtained using `canvas.getContext('webgl')`. If WebGL is not available, the function will throw an error.

   - **Viewport and Clear Color**: 
     - The viewport is set to the canvas's width and height using `gl.viewport()`.
     - The clear color is set to white (`1.0, 1.0, 1.0, 1.0`), and the color buffer is cleared.

   - **Shaders**:
     - **Vertex Shader**: 
       - This shader processes each vertex. It takes in the vertex position (`vPosition`) and the color (`vColor`). The shader sets the size of the point (`gl_PointSize = 3.0`) and the vertex position (`gl_Position`).
       - The color is passed to the fragment shader through a varying variable (`fColor`).
     
     - **Fragment Shader**: 
       - This shader determines the color of each fragment (pixel). It receives the color from the vertex shader (`fColor`) and sets it as the fragment color (`gl_FragColor`).

   - **Buffer Setup**:
     - **Position Buffer**:
       - A buffer is created and bound to the array buffer target (`gl.ARRAY_BUFFER`).
       - Memory is allocated for `maxNumVertices` (5000) vertices using `gl.bufferData()` with `gl.DYNAMIC_DRAW` indicating that the data will be updated frequently.
       - The `vPosition` attribute is then linked to this buffer, and the buffer is enabled for use.
     
     - **Color Buffer**:
       - Similar to the position buffer, but this buffer holds color data for each vertex.
       - Memory is allocated for the color data (4 floats per vertex), and the `vColor` attribute is linked and enabled.

   - **Event Listeners**:
     - Event listeners are added to handle mouse events (`mousedown`, `mousemove`, `mouseup`, and `mouseout`). These events trigger the drawing of points on the canvas.

#### 2. **Shader Creation (`createShader()` function)**
   - Takes the WebGL context (`gl`), the type of shader (`gl.VERTEX_SHADER` or `gl.FRAGMENT_SHADER`), and the source code for the shader.
   - The shader is compiled, and if there's a compilation error,it is noted, and the shader is deleted.

#### 3. **Program Creation (`createProgram()` function)**
   - Creates a WebGL program, attaches the vertex and fragment shaders, and links the program.
   - If the program linking fails, an error is logged, and the program is deleted.

#### 4. **Drawing Control (`startDrawing()`, `draw()`, `stopDrawing()` functions)**
   - **startDrawing**: Starts the drawing process by setting `isDrawing` to `true` and immediately adds the first point.
   - **draw**: Continues adding points as the mouse moves, updating the buffers and rendering the new points.
   - **stopDrawing**: Stops the drawing process by setting `isDrawing` to `false`.

#### 5. **Adding Points (`addPoint()` function)**
   - Converts the mouse coordinates to WebGL coordinates, which range from `-1` to `1`.
   - Appends the converted coordinates to the `points` array.
   - Generates a random color and adds it to the `colors` array.
   - **Buffer Update**:
     - `gl.bufferSubData` is used to update the position buffer and color buffer with the new data. This function allows only the changed portion of the buffer to be updated rather than reallocating the entire buffer, which is more efficient.

#### 6. **Rendering (`render()` function)**
   - Clears the color buffer to remove previous drawings.
   - Draws the points using `gl.drawArrays(gl.POINTS, 0, points.length / 2)`, where `points.length / 2` gives the number of vertices (since each point consists of 2 coordinates).

### Conclusion
This code provides a WebGL application that allows for interactive drawing on a canvas. It demonstrates basic WebGL concepts like shaders, buffers, and rendering, while also efficiently updating and drawing data on the fly using `gl.bufferSubData`.