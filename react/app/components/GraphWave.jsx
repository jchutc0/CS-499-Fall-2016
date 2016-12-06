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
  // declare the usable percentage of the graph (to make it pretty)
  usable: 100,

  // declare a graph scaling factor to allow adjusting the FFT size without
  //   making the graph unusable
  // this should be >0 and <=1 to be useful
  scale: 0.02,

  // constants for the graph labels
  graphLabels: {
    barHeight: 5,
    highValue: 0.025,
    precision: 3,
    numberOfDivisions: 5,
    barStyle: '#999999',
    labelStyle: '#666666',
    labelFont: '10px Arial',
    topTextOffset: 11,
    bottomTextOffset: 3,

  },

  // component takes a required array of numbers
  propTypes: {
    data   : React.PropTypes.object.isRequired
  },    // propTypes

  /*
  componentDidMount function

  invoked after component mounts
  Draws the graph
  */
  componentDidMount: function() {
    this.drawGraph();
  },      // componentDidMount function

  componentDidUpdate() {
    this.drawGraph();
  },

  drawGraph: function() {
    var data = this.props.data;

    // defines the canvas and the draw context for the graph
    var canvas = this.refs.waveGraphCanvas;
    var drawContext = canvas.getContext('2d');

    // clears the box
    drawContext.fillStyle = '#CCCCCC';
    drawContext.fillRect(0, 0, this.width, this.height);

    // draws the horizontal line through the center of the graph
    drawContext.beginPath();
    drawContext.strokeStyle = '#FF0000';
    drawContext.moveTo(0, this.height / 2);
    drawContext.lineTo(this.width, this.height / 2);
    drawContext.stroke();

    drawContext.beginPath();
    drawContext.strokeStyle = '#0000FF';

    // now generate arrays of horizontal and vertical coordinates
    var horizontalCoords = this.generateHorizontalCoords(
      Math.floor(data.length * this.scale)
    );
    var verticalCoords = this.generateVerticalCoords(data);

    for(var i = 0; i < data.length; i++) {
      if(i !== 0) {
        drawContext.lineTo(horizontalCoords[i], verticalCoords[i]);
      } else {
        drawContext.moveTo(horizontalCoords[i], verticalCoords[i]);
      }   // if..else for i being the first element
    }     // array iteration for loop

    drawContext.stroke();
    this.drawGraphLabels(drawContext);
  },      // drawGraph function

  /*
  generateVerticalCoords function

  Takes an array of numbers between -1 and 1 and generates an array of values to
  map those points onto a graph having dimensions this.width by this.height
  using this.usable vertical percent of the graph
  */
  generateVerticalCoords: function(data) {
    var {height, usable} = this;

    // to fit the graph right, we need to rescale the numbers around 0 and then
    //   shift them up so they're at the center of the graph
    // scaling factor add * -1 since graph origin is at (0, this.height)
    // var scalingFactor = -1 * height / 2 * usable / 100 / 128;
    // var shiftingFactor = height / 2;
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

  Takes the length of an array and generates an array of values to map those
  points onto a graph having dimensions this.width by this.height
  */
  generateHorizontalCoords: function(length) {
    var {width, usable} = this;

    // we should never get < 0 element arrays, but just in case
    if ((length <= 0) || (length === undefined) || isNaN(length)) {
      return [];
    } else if (length == 1) {
      // prevent a divide by 0 error in case of 1 element arrays
      return [0];
    }

    // to scale the data to the graph size
    var scalingFactor = width / (length - 1);

    // set up array to return values
    var returnArray = new Array(length);

    for(var i = 0; i < length; i++) {
      returnArray[i] = Math.floor(i * scalingFactor);
    }

    return returnArray;
  },      // generateVerticalCoords function

  drawGraphLabels: function(context) {

    var {
      barHeight,
      highValue,
      precision,
      numberOfDivisions,
      barStyle,
      labelStyle,
      labelFont,
      topTextOffset,
      bottomTextOffset
    } = this.graphLabels;

    var xDifference = this.width / numberOfDivisions;
    var valueDifference = highValue / numberOfDivisions;
    var precisionFacor = Math.pow(10, precision);

    var value = valueDifference;
    var xCoord = xDifference;
    for (var i = 1; i < numberOfDivisions; i++) {
      var roundedValue = (
        Math.round(value * precisionFacor) / precisionFacor
      );
      // draw the bars
      context.strokeStyle = barStyle;
      context.beginPath();
      context.moveTo(xCoord, this.height - barHeight);
      context.lineTo(xCoord, this.height);
      context.stroke();
      context.beginPath();
      context.moveTo(xCoord, barHeight);
      context.lineTo(xCoord, 0);
      context.stroke();

      // put in the text
      context.fillStyle = labelStyle;
      context.font = labelFont;
      context.textAlign = 'center';
      context.fillText(roundedValue, xCoord, barHeight + topTextOffset);
      context.fillText(
        roundedValue, xCoord, this.height - barHeight - bottomTextOffset
      );

      // on to the next point
      value += valueDifference;
      xCoord += xDifference;
    }
  },



    //   context.fillText(printedFreq, location, barHeight + topTextOffset);
    //   context.fillText(
    //     printedFreq, location, this.height - barHeight - bottomTextOffset
    //   );
    // }   // for drawing loop


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
        <canvas id="GraphWaveCanvas" width={this.width}
          height={this.height} ref='waveGraphCanvas' style={canvasStyle}>
        </canvas>
      </div>
    );        // return value
  }           // render function
});           // GraphWave class

// export GraphWave for other modules to use
module.exports = GraphWave;
