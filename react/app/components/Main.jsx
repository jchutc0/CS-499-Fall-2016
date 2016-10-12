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
    var audioContext = new AudioContext();
    return {
      userMessage: 'Default user message',
      audioContext: audioContext
    };
  },

  handlePlayTelephony: function(numPressed) {
    var context = this.state.audioContext;
    var oscillator1 = context.createOscillator();
    var oscillator2 = context.createOscillator();
    var gainNode1 = context.createGain();
    var gainNode2 = context.createGain();

    this.setState( {
      userMessage: 'Last number pressed was: ' + numPressed,
      audioOutPlayerCommand: 'playTelephony',
      oscillator1: oscillator1,
      oscillator2: oscillator2,
      gainNode1: gainNode1,
      gainNode2: gainNode2,
      audioOutObject: {
        context: context,
        playerCommand: 'playTelephony',
        numPressed: numPressed,
        oscillator1: oscillator1,
        oscillator2: oscillator2,
        gainNode1: gainNode1,
        gainNode2: gainNode2
      }
    });
  },

  handleStopSound: function() {
    this.setState( {
      // userMessage: this.state.userMessage + {"\n"} + 'No numbers pressed.'
      userMessage:
      <div>
        {this.state.userMessage} <br/>
        No numbers pressed
      </div>,
      audioOutObject: {
        context: this.state.audioContext,
        playerCommand: 'stop',
        numPressed: undefined,
        oscillator1: this.state.audioOutObject.oscillator1,
        oscillator2: this.state.audioOutObject.oscillator2,
        gainNode1: this.state.audioOutObject.gainNode1,
        gainNode2: this.state.audioOutObject.gainNode2
      }
    });
  },

  handlePlayFrequency: function(frequencyObj) {
    this.setState( {
      userMessage: 'handlePlayFrequency -- ' +
      'frequency1: ' + frequencyObj.frequency1 + '; ' +
      'frequency2: ' + frequencyObj.frequency2
    });
  },

  displayAudioOut: function() {
    if(this.state.audioOutPlayerCommand !== undefined) {
      return (
        <div>
          <AudioOut playerObject={this.state.audioOutObject}/>
        </div>
      );
    }
    return (
      <div>
        <AudioOut/>
      </div>
    );
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
            {this.displayAudioOut()}
          </div>
        </div>
      </div>
      );
    }
  });

module.exports = Main;
