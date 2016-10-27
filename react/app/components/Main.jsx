/*****
Main class

The purpose of this class is to act as a controller class. It gets user input
from forms and sends the information to the output classes. It acts as an
entry point to the program.
*****/

// Require the React framework
var React = require('react');

// require helper components to render the graphs, forms, notes, and audio
// var GraphWave = require('GraphWave');
// var GraphFrequency = require('GraphFrequency');
var Graph = require('Graph');
var Form = require('Form');
var NotesToUser = require('NotesToUser');
var AudioOut = require('AudioOut');

// Create the Main class
var Main = React.createClass({

  /*
  getInitialState function

  Sets default state values
  */
  getInitialState: function() {
    return {
      userMessage: 'Default user message'
    };        // state object
  },          // getInitialState function

  /*
  handlePlayFrequency function

  Invoked from form classes
  Saves gathered frequency information to state for passing to AudioOut and
  NotesToUser
  */
  handlePlayFrequency: function(frequencyObj) {
    this.setState({
      userMessage: 'handlePlayFrequency -- ' +
      'frequency1: ' + frequencyObj.frequency1 + '; ' +
      'frequency2: ' + frequencyObj.frequency2,
      audioOutObject: {
        frequency1: frequencyObj.frequency1,
        gain1: frequencyObj.gain1,
        frequency2: frequencyObj.frequency2,
        gain2: frequencyObj.gain2,
        whiteNoise: frequencyObj.whiteNoise
      },      // audioOutObject
    });       // state object
  },          // handlePlayFrequency function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <p>Rendered Main hi</p>
        <div className="row">
          <div className="columns small-12 medium-10 small-centered">
            <div className="columns small-12 large-6">
              <div>
                <Graph />
              </div>
            </div>
            <div className="columns small-12 large-6">
              <Form handlePlayFrequency={this.handlePlayFrequency}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            <NotesToUser message={this.state.userMessage}/>
            <AudioOut frequencyObj={this.state.audioOutObject}/>
          </div>
        </div>
      </div>
      );        // return value
    }           // render function
  });           // Main class

// export Main for other modules to use
module.exports = Main;
