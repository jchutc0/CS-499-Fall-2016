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
    data   : React.PropTypes.object.isRequired,
    fftSize : React.PropTypes.number.isRequired
  },    // propTypes

  /*
  componentDidMount function

  invoked after component mounts
  Draws the graph
  */
  componentDidMount: function() {
    this.drawGraph();
  },      // componentDidMount function

  /*
  componentDidUpdate function

  invoked after component's props change
  Draws the graph
  */
  componentDidUpdate: function() {
    this.drawGraph();
  },      // componentDidUpdate function

  drawGraph: function() {
    // console.log('fftSize: '+this.props.fftSize);
    var data = this.props.data;

    // defines the canvas and the draw context for the graph
    var canvas = this.refs.frequencyGraphCanvas;
    var drawContext = canvas.getContext('2d');

    // now generate arrays of horizontal and vertical coordinates
    var horizontalCoords = this.generateHorizontalCoords(data);
    var verticalCoords = this.generateVerticalCoords(data);

    // add gradients to the boxes to make green/yellow/red colors
    var gradient = drawContext.createLinearGradient(0,0,0,200);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.4, 'yellow');
    gradient.addColorStop(0.6, 'yellow');
    gradient.addColorStop(1, 'green');
    drawContext.fillStyle = gradient;
    // console.log('data.length: '+data.length);

    // clears the box
    drawContext.fillStyle = '#FFFFFF';
    drawContext.fillRect(0, 0, this.width, this.height);


    // //------draws the vertical lines through the graph at 440 Hz---------
    // drawContext.beginPath();
    // //drawContext.strokeStyle = '#FF0000';
    // drawContext.moveTo(170,0);
    // drawContext.lineTo(170,200);
    // drawContext.stroke();

    //drawContext.beginPath();
    //drawContext.strokeStyle = '#0000FF';
    //---------------------------------------------------------

    for(var i = 0; i < data.length; i++) {
      drawContext.fillStyle = gradient;
      // since axes are flipped starting from (x, y) and working down
      drawContext.fillRect(
        horizontalCoords[i] - 1, verticalCoords[i],
        2, this.height - verticalCoords[i]
      );
    }     // array iteration for loop

    this.drawFrequencyDivision(440, drawContext);

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
    var scalingFactor = -1 * height / 256;
    var shiftingFactor = height;

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

    var maxLog = Math.log2(data.length);

    var returnArray = new Array(length);

    // implement logarithmic scale
    for(var i = 0; i < length; i++) {
      returnArray[i] = Math.log2(i) / maxLog * width;
    }

    return returnArray;
  },      // generateVerticalCoords function

  drawFrequencyDivision: function(frequency, context) {
    // console.log('drawFrequencyDivision '+ samples);
    var maxFreq = 20000;
    var minFreq = 20;
    var samples = this.props.fftSize;

    // check for valid number of samples to avoid divide by 0
    if((samples <= 0) || (samples === undefined) || (isNaN(samples))) {
      return;
    }

    // determine which division corresponds to the frequency
    var division440 = samples / (maxFreq-minFreq) * (440-minFreq);
    var division880 = samples / (maxFreq-minFreq) * (880-minFreq);

    // determine the corresponding graph location
    var maxLog = Math.log2(samples);
    var location440 = (
      Math.log2(division440) / maxLog * this.width
    );
    var location880 = (
      Math.log2(division880) / maxLog * this.width
    );

    var locationDifference = location880 - location440;

    for(
      var location = location440;
      location > minFreq;
      location -= locationDifference
    ) {
      context.strokeStyle = '#999999';
      context.beginPath();
      context.moveTo(location,0);
      context.lineTo(location,this.height);
      context.stroke();
    }
    for(
      var location = location880;
      location < maxFreq;
      location += locationDifference
    ) {
      context.strokeStyle = '#999999';
      context.beginPath();
      context.moveTo(location,0);
      context.lineTo(location,this.height);
      context.stroke();
    }

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
