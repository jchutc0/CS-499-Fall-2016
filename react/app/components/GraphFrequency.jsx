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
    handlePlayFrequency: React.PropTypes.func.isRequired,
    data   : React.PropTypes.object.isRequired,
    frequencyBinCount : React.PropTypes.number.isRequired

  },    // propTypes


  ///// Mouse Listener Functionality ////////////////////////////////////////

  toneGain: 4,

  mouseDownListener: function(e) {
    e.preventDefault();

    // get the mouse position
    //  this takes into account possible resizing
    var canvas = this.refs.frequencyGraphCanvas;
    var freqX = this.calculateMouseFrequency(e.clientX);
    // console.log('DOWN - freq: '+freqX);
    this.props.handlePlayFrequency([freqX], [this.toneGain]);

    // add a listener for move to get "drag"
    canvas.addEventListener(
      'mousemove', this.mouseMoveListener, false
    );

    // remove the down listener (until mouse released)
    canvas.removeEventListener(
      'mousedown', this.mouseDownListener, false
    );

    // add a mouseup listener (so we know when released)
    window.addEventListener(
      'mouseup', this.mouseUpListener, false
    );
  },

  mouseUpListener: function(e) {
    e.preventDefault();
    console.log('UP');
    this.props.handlePlayFrequency();
    var canvas = this.refs.frequencyGraphCanvas;

    // put mousedown listener back
    canvas.addEventListener(
      'mousedown', this.mouseDownListener, false
    );
    // mouse is up - remove up listener
    window.removeEventListener(
      'mouseup', this.mouseUpListener, false
    );

    // drag is over - stop listening to move
    canvas.removeEventListener(
      'mousemove', this.mouseMoveListener, false
    );
  },

  mouseMoveListener: function(e) {
    var freqX = this.calculateMouseFrequency(e.clientX);
    // console.log('MOVE - freq: '+freqX);
    this.props.handlePlayFrequency([freqX], [this.toneGain]);
  },

  calculateMousePositionX: function(coord) {
    var canvas = this.refs.frequencyGraphCanvas;
    var bound = canvas.getBoundingClientRect();
    var min = 0;
    var max = canvas.width;
    var returnVal = (coord - bound.left) * (canvas.width / bound.width);

    returnVal = (returnVal < min) ? min : (returnVal > max) ? max : returnVal;
    return returnVal;
  },

  calculateMouseFrequency: function(coord) {
    var samples = this.props.frequencyBinCount;

    // check for valid number of samples to avoid divide by 0 or log error
    if((samples <= 1) || (samples === undefined) || (isNaN(samples))) {
      return;
    }

    var canvas = this.refs.frequencyGraphCanvas;
    var bound = canvas.getBoundingClientRect();
    var min = 0;
    var max = canvas.width;
    var pos = (coord - bound.left) * (canvas.width / bound.width);
    var maxLog = Math.log2(samples);

    pos = (pos < min) ? min : (pos > max) ? max : pos;

    return (
      this.props.binSize * Math.pow(2, pos / max * maxLog)
    );
  },

  ///////////////////////////////////////////////////////////////////////////

  /*
  componentDidMount function

  invoked after component mounts
  Draws the graph
  */
  componentDidMount: function() {
    this.refs.frequencyGraphCanvas.addEventListener(
      'mousedown', this.mouseDownListener, false
    );
    this.drawGraph();
  },      // componentDidMount function

  componentWillUnmount: function() {
    this.refs.frequencyGraphCanvas.removeEventListener(
      'mousedown', this.mouseDownListener, false
    );
  },

  /*
  componentDidUpdate function

  invoked after component's props change
  Draws the graph
  */
  componentDidUpdate: function() {
    this.drawGraph();
  },      // componentDidUpdate function

  drawGraph: function() {
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
    drawContext.fillStyle = '#CCCCCC';
    drawContext.fillRect(0, 0, this.width, this.height);

    for(var i = 0; i < data.length; i++) {
      drawContext.fillStyle = gradient;
      // since axes are flipped starting from (x, y) and working down
      drawContext.fillRect(
        horizontalCoords[i] - 1, verticalCoords[i],
        2, this.height - verticalCoords[i]
      );
    }     // array iteration for loop

    this.drawFrequencyDivision(drawContext);

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

  /*
  drawFrequencyDivision function
  */
  drawFrequencyDivision: function(context) {

    var samples = this.props.frequencyBinCount;

    // check for valid number of samples to avoid divide by 0 or log error
    if((samples <= 1) || (samples === undefined) || (isNaN(samples))) {
      return;
    }

    /*
    To find a base bar of 440 Hz:
    1) Find the number of total divisions we represent in the graph (the
    maxLog)
    2) Find the number of pixels between each division (the
    locationDifference)
    3) Find the location of the lowest power of 2 the graph can represent
    (locationLowest) using the same formula from generateHorizontalCoords
    4) Start at locationLowest and draw bars at each locationDifference
    location until the end of the graph
    */

    var maxLog = Math.log2(samples);
    var locationDifference = this.width / maxLog;
    var locationLowest = (
      Math.log2(3.4375 / this.props.binSize) / maxLog * this.width
    );

    for (
      var location = locationLowest;
      location < this.width;
      location += locationDifference
    ) {
      context.strokeStyle = '#999999';
      context.beginPath();
      context.moveTo(location,0);
      context.lineTo(location,this.height);
      context.stroke();
    }   // for drawing loop
  },    // drawFrequencyDivision funcion

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
        <canvas id="GraphFrequencyCanvas" width="400" height="200"
          ref='frequencyGraphCanvas' style={canvasStyle}>
        </canvas>
      </div>
    );        // return value
  }           // render function
});           // GraphFrequency class

// export GraphFrequency for other modules to use
module.exports = GraphFrequency;
