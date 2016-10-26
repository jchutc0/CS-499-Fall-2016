/*****
GraphFrequency class

The purpose of this class is to display graph for the frequency from the FFT
*****/

// Require the React framework
var React = require('react');

// Create the GraphFrequency class
var GraphFrequency = React.createClass({
  // declare width and height constants for easy changes
  width: 400,
  height: 200,

  // component takes a required array of numbers
  propTypes: {
    data   : React.PropTypes.array.isRequired
  },    // propTypes

  /*
  componentDidMount function

  invoked after component mounts
  Draws the graph
  */
  componentDidMount: function() {
    var data = this.props.data;

    // defines the canvas and the draw context for the graph
    var canvas = this.refs.frequencyGraphCanvas;
    var drawContext = canvas.getContext('2d');

    // now generate arrays of horizontal and vertical coordinates
    var horizontalCoords = this.generateHorizontalCoords(data);
    var verticalCoords = this.generateVerticalCoords(data);

    drawContext.fillStyle = '#333333';

    for(var i = 0; i < data.length; i++) {
      // since axes are flipped starting from (x, y) and working down
      drawContext.fillRect(
        horizontalCoords[i] - 1, verticalCoords[i],
        2, this.height - verticalCoords[i]
      );
    }     // array iteration for loop

  },      // componentDidMount function

  /*
  generateVerticalCoords function

  Takes an array of numbers between -1 and 1 and generates an array of values to
  map those points onto a graph having dimensions this.width by this.height
  using this.usable vertical percent of the graph
  */
  generateVerticalCoords: function(data) {
    var {height, usable} = this;

    // scale the data to fit the graph right
    // scaling factor add * -1 since graph origin is at (0, this.height)
    // shiftingFactor to shift to the bottom of the graph
    var scalingFactor = height;
    var shiftingFactor = 0;

    // set up array to return values
    var returnArray = new Array(data.length);

    for(var i = 0; i < data.length; i++) {
      returnArray[i] = Math.floor(data[i] * scalingFactor + shiftingFactor);
    }

    return returnArray;
  },      // generateVerticalCoords function

  /*
  generateHorizontalCoords function

  Takes an array and generates an array of values to map those points onto a
  graph having dimensions this.width by this.height
  */
  generateHorizontalCoords: function(data) {
    var {width, usable} = this;
    var length = data.length;

    // to scale the data to the graph size
    var scalingFactor = width / (length + 1);

    // set up array to return values
    var returnArray = new Array(length);

    for(var i = 0; i < length; i++) {
      returnArray[i] = Math.floor((i + 1) * scalingFactor);
    }

    return returnArray;
  },      // generateVerticalCoords function

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
        <p>Rendered GraphFrequency</p>
          <canvas id="GraphFrequencyCanvas" width="400" height="200"
            ref='frequencyGraphCanvas' style={canvasStyle}>
          </canvas>
      </div>
    );        // return value
  }           // render function
});           // GraphFrequency class

// export GraphFrequency for other modules to use
module.exports = GraphFrequency;
