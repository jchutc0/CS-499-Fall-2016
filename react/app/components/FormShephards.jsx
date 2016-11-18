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

  // maxFrequency, the highest frequency level we'll use
  maxFrequency: 17000,

  getInitialState: function() {
    return {
      lowTone: 0
    };
  },

  playShephards: function(lowTone) {
    var frequencyArray = [];
    var gainArray;
    var variance = this.variance;
    var mean = Math.log(this.meanFreq);
    for (
      var frequency = this.lowTones[lowTone].frequency;
      frequency < this.maxFrequency;
      frequency = frequency * 2
    ) {
      frequencyArray.push(frequency);
    }
    gainArray = new Array(frequencyArray.length);
    for(var i = 0; i < frequencyArray.length; i++) {
      gainArray[i] = (
        Math.exp(Math.pow((Math.log(frequencyArray[i]) - mean), 2)
       / (variance * -2)));
    }
    this.props.playFrequency(frequencyArray, gainArray);
  },

  handleSoundUpDown: function(e) {
    e.preventDefault();
    var newTone = (this.state.lowTone + 1) % this.lowTones.length;
    this.setState({
      lowTone: newTone
    });
    this.playShephards(newTone);
  },

  handleSoundDownDown: function(e) {
    e.preventDefault();
    var newTone = (this.state.lowTone + this.lowTones.length - 1) % this.lowTones.length;
    this.setState({
      lowTone: newTone
    });
    this.playShephards(newTone);
  },

  handleSoundButtonUp: function(e) {
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
        <button type='button' className='expanded button' ref='stopSound'
          onMouseDown={this.handleSoundUpDown}
          onMouseUp={this.handleSoundButtonUp}>Sound Up</button>
        <button type='button' className='expanded button' ref='stopSound'
          onMouseDown={this.handleSoundDownDown}
          onMouseUp={this.handleSoundButtonUp}>Sound Down</button>
        <p>Pitch played: {this.lowTones[this.state.lowTone].pitch}</p>
      </div>
    );        // return value
  }           // render function
});           // FormShephards class

// export FormShephards for other modules to use
module.exports = FormShephards;
