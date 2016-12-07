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
var FormKeyboard = require('FormKeyboard');


// Create the Main class
var Main = React.createClass({

  /*
  componentWillMount function

  This function is invoked as the component mounts

  Sets up the listeners to handle spacebar presses
  */
  componentWillMount: function() {
    window.addEventListener('keypress', this.handleKeypress);
  },      // componentWillMount

  /*
  componentWillUnmount function

  This function is invoked as the component unmounts

  Removes the key press listeners
  */
  componentWillUnmount: function() {
    window.removeEventListener('keypress', this.handleKeypress);
  },      // componentWillUnmount

  /*
  handleKeypress function

  Invoked from the keypress listener

  Decodes the key press for a spacebar press and sets the paused state
  */
  handleKeypress: function(key) {
    if(key.keyCode === 32) {
      // console.log('press');
      this.setState({
        paused: !(this.state.paused)
      });
    }
  },          // handleKeypress


  /*
  getInitialState function

  Sets default state values
  Creates the audio context used to generate sound and stores it in the state
  */
  getInitialState: function() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = context.createAnalyser();

    // set up context on state change watcher
    // context.onstatechange = function() {
    //   console.log(context.state);
    // };

    return {
      userMessage: '',
      context: context,
      analyser: analyser,
      audioOutFrequencyArray: [],
      audioOutGainArray: [],
      audioOutWhiteNoise: undefined,
      mute: true,
      paused: false,
      currentForm: 0
    };        // state object
  },          // getInitialState function

  /*
  handlePlayFrequency function

  Invoked from form classes
  Saves gathered frequency information to state for passing to AudioOut and
  NotesToUser
  */
  handlePlayFrequency: function(
    audioOutFrequencyArray, audioOutGainArray, audioOutWhiteNoise
  ) {
    this.setState({
      audioOutFrequencyArray: audioOutFrequencyArray,
      audioOutGainArray: audioOutGainArray,
      audioOutWhiteNoise: audioOutWhiteNoise
    });       // state object
  },          // handlePlayFrequency function

  /*
  handleFormChange function

  Invoked from form classes
  Sets the NotesToUser message and the currentForm in the state
  */
  handleFormChange: function(formNumber, messageToUser) {
    this.setState({
      currentForm: formNumber,
      userMessage: messageToUser
    });       // state object
  },          // handleFormChange function

  /*
  handleSoundMute function

  Invoked from audio class
  Communicates with graph class to zero out data
  */
  handleSoundMute: function(mute) {
    if (this.state.mute != mute) {
      this.setState({
        mute: mute
      });
    }
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    var renderMute = this.state.mute ? 'muted' : '';

    return (
      <div>
        <div className='row'>
          <div className='columns-small-12 medium-10'>
            <h1>Web-Based Audio Spectrum Analyzer</h1>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12 medium-10 small-centered">
            <Graph context={this.state.context}
              analyser={this.state.analyser}
              muted={this.state.mute}
              playing={!this.state.paused}
              handlePlayFrequency={this.handlePlayFrequency}/>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12 medium-10">
            <Form handlePlayFrequency={this.handlePlayFrequency}
              changeForm={this.handleFormChange}
              soundMute={this.handleSoundMute}
              context={this.state.context}
              analyser={this.state.analyser}/>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            <NotesToUser message={this.state.userMessage}/>
            <AudioOut
              frequencyArray={this.state.audioOutFrequencyArray}
              gainArray={this.state.audioOutGainArray}
              whiteNoise={this.state.audioOutWhiteNoise}
              context={this.state.context}
              soundMute={this.handleSoundMute}
              analyser={this.state.analyser}
              paused={this.state.paused}/>
          </div>
        </div>
        <div className='row'>
          <div className='columns-small-12 medium-10'>
            <p className='text-right'>
              <small>
                Presented by
                <a href="http://www.teamaudiophile.com/">Team Audiophile</a>
              </small>
            </p>
          </div>
        </div>
      </div>
    );        // return value
  }           // render function
});           // Main class

// export Main for other modules to use
module.exports = Main;
