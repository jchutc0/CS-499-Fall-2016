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

  // number of samples is the number of samples between 0 and the max scale
  //   value -- this is Math.floor(samples_per_second * max seconds)
  //   here, floor(44.1kHz * (1/40)s) = 1102
  numberOfSamples: 1102,

  // constants for the graph labels
  graphLabels: {
    barHeight: 5,       // height in pixels of the bars
    highValue: 0.025,   // higest value (in seconds)
    precision: 3,       // precision to print the divisions on the graph
    numberOfDivisions: 5,   // number of bars/lables to print
    barStyle: '#999999',    // color of the bars
    labelStyle: '#666666',  // color of the labels
    labelFont: '10px Arial',  // font for the labels
    topTextOffset: 11,        // text vertical offset for the top labels
    bottomTextOffset: 3,      // text vertical offset for the bottom labels
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
    var numberOfSamples = (
      data.length < this.numberOfSamples ? data.length : this.numberOfSamples
    );
    var horizontalCoords = this.generateHorizontalCoords(numberOfSamples);
    var verticalCoords = this.generateVerticalCoords(data, numberOfSamples);

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
  */
  generateVerticalCoords: function(data, size) {
    var {height} = this;

    // to fit the graph right, we need to rescale the numbers around 0 and then
    //   shift them up so they're at the center of the graph
    // scaling factor add * -1 since graph origin is at (0, this.height)
    var scalingFactor = -1 * height / 256;
    var shiftingFactor = height;

    // set up array to return values
    var returnArray = new Array(data.length);

    for(var i = 0; i < size; i++) {
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
    var {width} = this;

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
