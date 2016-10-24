// Require the React framework
var React = require('react');

var GraphWave = require('GraphWave');
var GraphFrequency = require('GraphFrequency');
var FormMain = require('FormMain');
var NotesToUser = require('NotesToUser');
var AudioOut = require('AudioOut');

// Load menu modules
var FormFrequency = require('FormFrequency');
var FormNumberPad = require('FormNumberPad');

var Main = React.createClass({

  getInitialState: function() {
    return {
      userMessage: 'Default user message'
    };
  },

  handlePlayTelephony: function(numPressed) {

    this.setState( {
      userMessage: 'Last number pressed was: ' + numPressed,
      audioOutObject: {
        playTelephony: numPressed
      }
    });
  },

  handleStopSound: function() {
    this.setState( {
      userMessage:
      <div>
        {this.state.userMessage} <br/>
        No numbers pressed
      </div>,
      audioOutObject: undefined
    });
  },

  handlePlayFrequency: function(frequencyObj) {
    this.setState( {
      userMessage: 'handlePlayFrequency -- ' +
      'frequency1: ' + frequencyObj.frequency1 + '; ' +
      'frequency2: ' + frequencyObj.frequency2,
      audioOutObject: {
        frequency1: frequencyObj.frequency1,
        gain1: frequencyObj.gain1,
        frequency2: frequencyObj.frequency2,
        gain2: frequencyObj.gain2,
        whiteNoise: frequencyObj.whiteNoise
      },
    });
  },

  render: function() {
    return (
      <div>
        <p>Rendered Main</p>
        <div className="row">
          <div className="columns small-12 medium-10 small-centered">
            <div className="columns small-12 medium-6">
              <div>
                <GraphWave/>
              </div>
              <div>
                <GraphFrequency/>
              </div>
            </div>
            <div className="columns small-12 medium-6">
              <FormMain handlePlayTelephony={this.handlePlayTelephony}
                handleStopSound={this.handleStopSound}
                handlePlayFrequency={this.handlePlayFrequency}/>
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
      );
    }
  });

module.exports = Main;
