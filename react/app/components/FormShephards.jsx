/*****
FormShephards class

The purpose of this class is to implement the Shephard's tone auditory illusion
*****/

// Require the React framework
var React = require('react');

// Create the FormShephards class
var FormShephards = React.createClass({

  // require the playFrequency function as a passed property
  propTypes: {
    playFrequency: React.PropTypes.func.isRequired
  },      // propTypes

  //// Class constants ////
  // low tones, the base tones to generate for the step up
  lowTones: [
    {frequency: 16.35, pitch: 'C'},
    {frequency: 17.32, pitch: 'C#/Db'},
    {frequency: 18.35, pitch: 'D'},
    {frequency: 19.45, pitch: 'D#/Eb'},
    {frequency: 20.60, pitch: 'E'},
    {frequency: 21.83, pitch: 'F'},
    {frequency: 23.12, pitch: 'F#/Gb'},
    {frequency: 24.50, pitch: 'G'},
    {frequency: 25.96, pitch: 'G#/Ab'},
    {frequency: 27.50, pitch: 'A'},
    {frequency: 29.14, pitch: 'A#/Bb'},
    {frequency: 30.87, pitch: 'B'}
  ],

  // variance and mean are used to determine the shape of the bell curve
  variance: 1,
  meanFreq: 440,

  // numberOfSamples, the number of samples to play
  //   with 10 samples, high values go from 8371.2 (C) to 15,805.44 (B)
  // 10 was chosen since maximum number of samples all musical pitches can
  //   represent and still be heard by the human ear
  numberOfSamples: 10,

  // // maxFrequency, the highest frequency level we'll use
  // maxFrequency: 17000,

  getInitialState: function() {
    return {
      lowTone: 0,
      arrayBase: 0
    };
  },

  playShephards: function(lowTone, arrayBase) {

    var startTone = this.lowTones[lowTone].frequency;
    var arraySize = this.numberOfSamples;
    var frequencyArray = new Array(arraySize);
    var gainArray = new Array(arraySize);

    var variance = this.variance;
    var mean = Math.log2(this.meanFreq);
    var frequency = startTone;
    for(var i = 0; i < arraySize; i++) {
      frequencyArray[(i+arrayBase+arraySize) % arraySize] = frequency;
      frequency = frequency * 2;
    }
    for(var i = 0; i < arraySize; i++) {
      gainArray[i] = (
        Math.exp(Math.pow((Math.log2(frequencyArray[i]) - mean), 2)
        / (variance * -2)));
      }
      this.props.playFrequency(frequencyArray, gainArray);
    },

    handleSoundUp: function(e) {
      e.preventDefault();
      var arraySize = this.lowTones.length;
      var newTone = (this.state.lowTone + 1) % arraySize;
      var newArrayBase = this.state.arrayBase;
      if(newTone < this.state.lowTone) {
        newArrayBase = (newArrayBase - 1) % arraySize;
      }
      this.setState({
        lowTone: newTone,
        arrayBase: newArrayBase
      });
      this.playShephards(newTone, newArrayBase);
    },

    handleSoundDown: function(e) {
      e.preventDefault();
      var arraySize = this.lowTones.length;
      var newTone = (this.state.lowTone + arraySize - 1) % arraySize;
      var newArrayBase = this.state.arrayBase;
      if(newTone > this.state.lowTone) {
        newArrayBase = (newArrayBase + 1) % arraySize;
      }
      this.setState({
        lowTone: newTone,
        arrayBase: newArrayBase
      });
      this.playShephards(newTone, newArrayBase);
    },

    handleStopSound: function(e) {
      e.preventDefault();
      this.props.playFrequency([], []);
    },

    /*
    render function

    renders the component to the web browser -- the default entry point
    */
    render: function() {
      return (
        <div>
          <button type='button' className='expanded button' ref='soundUp'
            onClick={this.handleSoundUp}>Sound Up</button>
          <button type='button' className='expanded button' ref='soundDown'
            onClick={this.handleSoundDown}>Sound Down</button>
          <button type='button' className='expanded button' ref='stopSound'
            onClick={this.handleStopSound}>Stop Sound</button>
          <p>Curent Pitch: {this.lowTones[this.state.lowTone].pitch}</p>
        </div>
      );        // return value
    }           // render function
  });           // FormShephards class

  // export FormShephards for other modules to use
  module.exports = FormShephards;
