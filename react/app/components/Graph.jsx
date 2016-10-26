/*****
Graph class

The purpose of this class is to take a stream, perform calculations on it, and
render it to the wave and frequency graphs.
*****/

// Require the React framework
var React = require('react');

// Require the Graph components
var GraphWave = require('GraphWave');
var GraphFrequency = require('GraphFrequency');

// Create the Graph class
var Graph = React.createClass({

  /*
  generateWaveform

  Generates an array of values for a cosine waveform based on passed parameters
  Takes: size - desired output array size; count - number of desired repeitions
  */
  generateWaveform: function(size, count) {
    // make sure we have useful information
    if(
      (size === undefined) || (size < 1) || (!Number.isInteger(size)) ||
      (count === undefined) || (count < 1) || (!Number.isInteger(count))
    ) {
      return [];
    }

    // create array to return
    var returnArray = new Array(size);

    // fill array with wave values
    for(var i = 0; i < size; i++) {
      returnArray[i] = Math.cos(count * 2 * Math.PI / size * i);
    }
    return returnArray;
  },        // generateWaveform function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    // create generic data to send to GraphWave
    var graphWaveArray = this.generateWaveform(1024, 1, 11);

    return (
      <div>
        <p>Rendered Graph</p>
        <GraphWave data={graphWaveArray}/>
        <GraphFrequency />
      </div>
    );        // return value
  }           // render function
});           // Graph class

// export Graph for other modules to use
module.exports = Graph;
