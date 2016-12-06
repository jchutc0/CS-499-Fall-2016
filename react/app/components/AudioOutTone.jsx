/*****
AudioOutTone Class

The purpose of this class is to act as a single tone generator
*****/

// Require the React framework
var React = require('react');

// create the AudioOutTone class
var AudioOutTone = React.createClass({

  propTypes: {
    frequency   : React.PropTypes.number.isRequired,
    amplitude   : React.PropTypes.number.isRequired,
    context     : React.PropTypes.object.isRequired
  },

  /*
  getInitialState function

  Creates the oscillator and gain values used to play a desired frequency.
  */
  getInitialState: function() {
    // console.log('  frequency: ' + this.props.frequency);
    // set up the frequency oscillators and gain values
    var context     = this.props.context;
    var oscillator  = context.createOscillator();
    var gain        = context.createGain();
    var analyser    = this.props.analyser;
    var amplitude   = this.props.amplitude;
    var frequency   = this.props.frequency;

    // connect up the audio context to the oscillator then the gain then the
    //   analyser and start the oscillator
    oscillator.connect(gain);
    gain.connect(analyser);
    analyser.connect(context.destination);
    gain.gain.value = 0;
    oscillator.start(0.025);

    // Start sound playing if valid inputs
    this.playSound({
      context: context,
      oscillator: oscillator,
      gain: gain,
      amplitude: amplitude,
      frequency: frequency,
      analyser: analyser
    });

    // set those values in the state
    return {
      oscillator    : oscillator,
      gain          : gain
    };      // return value
  },        // getInitialState function

  /*
  componentWillReceiveProps function

  This function is called before the component starts rendering to make it
  possible to set state variables based on the upcoming components without
  causing an infinite loop.

  Determines if a sound is to play, uses the oscillator and gain node to
  play that sound, and sets the state

  Takes: nextProps - an object of props that are coming into the component
  for its upcoming render
  */
  componentWillReceiveProps: function(nextProps) {

    // Start sound playing if valid inputs
    this.playSound({
      context: nextProps.context,
      oscillator: this.state.oscillator,
      gain: this.state.gain,
      amplitude: nextProps.amplitude,
      frequency: nextProps.frequency,
      analyser: nextProps.analyser
    });
  },        // componentWillReceiveProps function

  /*
  playSound function

  This function is invoked from getInitialState to play sounds when the
  component first renders, and then from componentWillReceiveProps to play
  sounds when the props are updated.

  Determines if a sound is to play, If a sound is to play, sets the gain and
  oscillator frequency based on values from the passed object and then resumes
  the audio context.

  Returns true or false based on whether a sound is playing.
  */
  playSound: function(soundObj) {
    var {
      context,
      oscillator,
      gain,
      amplitude,
      frequency,
      analyser
    } = soundObj;

    gain.gain.value = amplitude;
    oscillator.frequency.value = frequency;
    context.resume();
  },      // playSound function


  /*
  componentWillUnmount function

  This function is called as the component is no longer rendering

  Stops the oscillator to turn off tone generation
  */
  componentWillUnmount: function() {
    this.state.gain.gain.value = 0;
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {

    // visual aspect of the component
    return (
      <div></div>
    );  // return value
  }     // render function
});     // AudioOutTone class

// export AudioOutTone for other modules to use
module.exports = AudioOutTone;
