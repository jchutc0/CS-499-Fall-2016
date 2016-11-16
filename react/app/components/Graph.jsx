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

  // Require the context object as a prop
  propTypes: {
    context     : React.PropTypes.object.isRequired
  },  // propTypes

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

  Decodes the key press for a spacebar press and sends it to the toggleTimer
  function
  */
  handleKeypress: function(key) {
    if(key.keyCode === 32) {
      console.log('press');
      this.toggleTimer();
    }
  },          // handleKeypress

  getInitialState: function() {

    // var dataArray = new Uint8Array(bufferLength);
    // analyser.getByteTimeDomainData(dataArray);
    this.startTimer();


    return ({
      waveArray: {},
      freqArray: {},
      playing: true
    });
  },

  startTimer: function() {
    console.log('Timer started.');
    var analyser = this.props.analyser;

    analyser.fftSize = 16384;
    analyser.smoothingTimeConstant = 0.1;
    var bufferLength = analyser.fftSize;

    this.timer = setInterval(() => {
      var waveArray = new Uint8Array(analyser.fftSize);
      var freqArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteTimeDomainData(waveArray);
      analyser.getByteFrequencyData(freqArray);
      // console.log(dataArray);
      // this.handleGraphUpdate(dataArray);
      if(this.props.context.state === 'suspended') {
        this.setState({
          waveArray: {},
          freqArray: {}
        });
      } else {
        // console.log(freqArray);
        this.setState({
          waveArray: waveArray,
          freqArray: freqArray
        });
      }
    }, 25);
  },

  toggleTimer: function() {
    if(this.timer === undefined) {
      this.setState({
        playing: true
      });
      this.startTimer();
    } else {
      console.log('Stopping timer.');
      this.setState({
        playing: false
      });
      clearInterval(this.timer);
      this.timer = undefined;
    }
  },

  // handleGraphUpdate: function(waveArray) {
  //   if(this.props.context.state === 'suspended') {
  //     waveArray = {};
  //   }
  //   this.setState({
  //     waveArray: waveArray
  //   });
  // },

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
  generateFrequencyWave

  Uses generateWaveform and alters the result to give values between 0 and 1
  */
  generateFrequencyWave: function(size, count) {
    var returnArray = this.generateWaveform(size, count);
    for(var i = 0; i < returnArray.length; i++) {
      returnArray[i] = returnArray[i] * 0.5 + 0.5;
    }         // for loop

    return returnArray;
  },          // generateFrequencyWave function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    // create generic data to send to GraphWave
    var graphWaveArray = this.state.waveArray; // this.generateWaveform(1024, 11);
    var graphFreqArray = this.state.freqArray;   //  this.generateFrequencyWave(128, 3);
    // [.1, .2, .3, .4, .5];

    return (
      <div>
        <p>Rendered Graph</p>
        <GraphWave data={this.state.waveArray}/>
        <GraphFrequency data={graphFreqArray}
          frequencyBinCount={this.props.analyser.frequencyBinCount}
          binSize={this.props.context.sampleRate / this.props.analyser.fftSize}/>
      </div>
    );        // return value
  }           // render function
});           // Graph class

// export Graph for other modules to use
module.exports = Graph;
