var React = require('react');

var GraphWave = require('GraphWave');
var GraphFrequency = require('GraphFrequency');
var FormMain = require('FormMain');
var NotesToUser = require('NotesToUser');

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
      userMessage: 'Last number pressed was: ' + numPressed
    });
  },

  handleStopSound: function() {
    this.setState( {
      // userMessage: this.state.userMessage + {"\n"} + 'No numbers pressed.'
      userMessage:
      <div>
        {this.state.userMessage} <br/>
        No numbers pressed
      </div>
    });
  },

  handlePlayFrequency: function(frequencyObj) {
    this.setState( {
      userMessage: 'handlePlayFrequency -- ' +
      'frequency1: ' + frequencyObj.frequency1 + '; ' +
      'frequency2: ' + frequencyObj.frequency2
    });
  },

  render: function() {
    return (
      <div>
        <p>Rendered Main</p>
        <div className="row">
          <div className="columns medium-10 small-centered">
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
          </div>
        </div>
      </div>
      );
    }
  });

module.exports = Main;
