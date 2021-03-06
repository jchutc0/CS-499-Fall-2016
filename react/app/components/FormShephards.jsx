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
  variance: 2,
  meanFreq: 632,

  // numberOfSamples, the number of samples to play
  //   with 10 samples, high values go from 8371.2 (C) to 15,805.44 (B)
  // 10 was chosen since maximum number of samples all musical pitches can
  //   represent and still be heard by the human ear
  numberOfSamples: 10,
  delay: 1000,

  getInitialState: function() {
    return {
      auto: false,
      autoDirection: 1,
      lowTone: 0,
      arrayBase: 0,
      isPlaying: false,
      gain: 1
    };
  },

  componentWillUpdate: function(nextProps, nextState) {
    var {lowTone, arrayBase, isPlaying, gain} = nextState;

    if(
      (lowTone != this.state.lowTone) ||
      (arrayBase != this.state.arrayBase) ||
      (isPlaying != this.state.isPlaying) ||
      (gain != this.state.gain)
    ) {
      this.playShephards(lowTone, arrayBase, isPlaying, gain);
    }
  },

  componentWillUnmount: function() {
    clearInterval(this.timer);
  },

  playShephards: function(lowTone, arrayBase, isPlaying, gain) {
    if(!isPlaying) {
      return this.props.playFrequency();
    }
    var frequencyArray = this.generateFrequencyArray(lowTone, arrayBase);
    var gainArray = this.generateGainArray(frequencyArray, gain);

    if(gain > 0) {
      return this.props.playFrequency(frequencyArray, gainArray);
    } else {
      return this.props.playFrequency();
    }
  },

  handleSoundUp: function(e) {
    e.preventDefault();
    this.refs.soundUp.blur();
    this.changePitch(1);
  },

  handleSoundDown: function(e) {
    e.preventDefault();
    this.refs.soundDown.blur();
    this.changePitch(-1);
  },

  changePitch: function(change) {
    var arraySize = this.lowTones.length;
    var numberOfSamples = this.numberOfSamples;
    var newTone = (this.state.lowTone + arraySize + change) % arraySize;
    var arrayBase = this.state.arrayBase;
    if(
      ((newTone < this.state.lowTone) && (change > 0)) ||
      ((newTone > this.state.lowTone) && (change < 0))
    ) {
      arrayBase = (arrayBase + numberOfSamples - change) % numberOfSamples;
    }
    this.setState({
      lowTone: newTone,
      arrayBase: arrayBase,
      isPlaying: true,
      autoDirection: change
    });
  },

  handleToggleSound: function(e) {
    e.preventDefault();
    this.refs.toggleSound.blur();
    var auto = this.state.auto && !this.state.isPlaying;
    if(!auto) {
      this.stopTimer();
    }
    this.setState({
      auto: auto,
      isPlaying: !this.state.isPlaying
    });
  },

  handleAuto: function(e) {
    e.preventDefault();
    var auto = !this.state.auto;
    this.refs.auto.blur();
    this.setState({
      auto: auto,
      isPlaying: true
    });
    if(auto) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  },

  generateFrequencyArray: function(lowTone, arrayBase) {
    var arraySize = this.numberOfSamples;
    var startTone = this.lowTones[lowTone].frequency
    var frequencyArray = new Array(arraySize);
    var frequency = startTone;
    for(var i = 0; i < arraySize; i++) {
      frequencyArray[(i+arrayBase+arraySize) % arraySize] = frequency;
      frequency = frequency * 2;
    }
    return frequencyArray;
  },

  generateGainArray: function(frequencyArray, gain) {
    var arraySize = this.numberOfSamples;
    var gainArray = new Array(arraySize);
    var variance = this.variance;
    var mean = Math.log2(this.meanFreq);

    for(var i = 0; i < arraySize; i++) {
      gainArray[i] = (
        Math.exp(Math.pow((Math.log2(frequencyArray[i]) - mean), 2)
        / (variance * -2)) * gain
      );
    }
    return gainArray;
  },

  /*
  handleGainChange function
  invoked when the volume slider value is changed

  */
  handleGainChange: function(e) {
    // preventDefault so we don't reload the page when the user presses enter
    e.preventDefault();
    var newGain = this.refs.gain.value / 10;

    if(this.state.gain !== newGain) {
      this.setState({
        gain: newGain
      });
    }
  },      // handleGainChange function


  startTimer: function() {
    this.timer = setInterval(() => {
      this.changePitch(this.state.autoDirection);
    }, this.delay);
  },

  stopTimer: function() {
    clearInterval(this.timer);
    this.timer = undefined;
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    var renderToggleButton = () => {
      if(this.state.isPlaying) {
        return (
          <button type='button' className='alert button' ref='toggleSound'
            onClick={this.handleToggleSound}>Stop Sound</button>
        );
      } else {
        return (
          <button type='button' className='success button' ref='toggleSound'
            onClick={this.handleToggleSound}>Start Sound</button>
        );
      }
    };
    var renderAutoButton = () => {
      var playing = 'button';
      if(this.state.auto) {
        playing = 'button alert';
      }
      return (
        <div>
          <button type='button' className={playing} ref='auto'
            onClick={this.handleAuto}>Auto</button>
        </div>
      );
    }
    return (
      <div className='shephards-form'>
        <div className='row'>
          <div className='columns small-12 medium-6'>
            <button type='button' className='button' ref='soundDown'
              onClick={this.handleSoundDown}>Sound Down</button>
            {renderToggleButton()}
            <button type='button' className='button' ref='soundUp'
              onClick={this.handleSoundUp}>Sound Up</button>
          </div>
          <div className='columns small-12 medium-6 text-right'>
            {renderAutoButton()}
          </div>
        </div>
        <div className='row'>
          <div className='columns small-12 medium-6'>
            <label htmlFor='gain' >Volume:</label>
            <input type='range' className='slider'
              name='gain' ref='gain'
              min='0' max='10'
              defaultValue='10'
              onChange={this.handleGainChange}/>
          </div>
          <div className='columns small-12 medium-6 text-right'>
            Curent Pitch: {this.lowTones[this.state.lowTone].pitch}
          </div>
        </div>
        {this.props.children}
      </div>
    );        // return value
  }           // render function
});           // FormShephards class

// export FormShephards for other modules to use
module.exports = FormShephards;
