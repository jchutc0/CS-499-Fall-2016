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
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <p>Rendered Graph</p>
        <GraphWave />
        <GraphFrequency />
      </div>
    );        // return value
  }           // render function
});           // Graph class

// export Graph for other modules to use
module.exports = Graph;
