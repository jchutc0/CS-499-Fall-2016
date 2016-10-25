/*****
GraphWave class

The purpose of this class is to display graph for the audio wave
*****/

// Require the React framework
var React = require('react');

// Create the GraphWave class
var GraphWave = React.createClass({

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
          <canvas id="GraphWaveCanvas" width="400" height="200" style={canvasStyle}>
          </canvas>
      </div>
    );        // return value
  }           // render function
});           // GraphWave class

// export GraphWave for other modules to use
module.exports = GraphWave;
