/*****
GraphWave class

The purpose of this class is to display graph for the audio wave
*****/

// Require the React framework
var React = require('react');

// Create the GraphWave class
var GraphWave = React.createClass({

  // declare width and height constants for easy changes
  width: 400,
  height: 200,

  /*
  componentDidMount function

  invoked after component mounts
  Draws the graph
  */
  componentDidMount: function() {
    // defines the canvas and the draw context for the graph
    var canvas = this.refs.waveGraphCanvas;
    var drawContext = canvas.getContext('2d');

    // draws the horizontal line through the center of the graph
    drawContext.moveTo(0, this.height / 2);
    drawContext.lineTo(this.width, this.height / 2);
    drawContext.stroke();
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    // set up style for canvas
    var canvasStyle = {
      border: '1px solid #000000'
    };

    return (
      <div>
        <p>Rendered GraphWave</p>
          <canvas id="GraphWaveCanvas" width={this.width}
            height={this.height} ref='waveGraphCanvas' style={canvasStyle}>
          </canvas>
      </div>
    );        // return value
  }           // render function
});           // GraphWave class

// export GraphWave for other modules to use
module.exports = GraphWave;
