/*****
AudioOutTone Class

The purpose of this class
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

  Creates the audio context used to generate sound and the oscillator and gain
  values used to play a desired frequency. Also sets up an audio buffer for
  white noise generation and sets up the whiteNoise script processor to
  generate white noise. Also sets up isPlaying so the component knows if a
  sound is playing.
  */
  getInitialState: function() {
    // set up the frequency oscillators and gain values
    var context     = this.props.context;
    var oscillator  = context.createOscillator();
    var gain        = context.createGain();

    return {
      oscillator    : oscillator,
      gain          : gain,
      isPlaying     : false
    };      // return value
  },        // getInitialState function

  /*
  componentWillReceiveProps function

  This function is called before the component starts rendering to make it
  possible to set state variables based on the upcoming components without
  causing an infinite loop. Sets the next isPlaying state

  Takes: nextProps - an object of props that are coming into the component
  for its upcoming render
  */
  componentWillReceiveProps: function(nextProps) {
    var context       = nextProps.context;
    var oscillator    = this.state.oscillator;
    var gain          = this.state.gain;
    var amplitude     = nextProps.amplitude;
    var frequency     = nextProps.frequency;

    // if isPlaying, stop tone and create a new oscillator to play next tone
    //   if needed
    if(this.state.isPlaying) {
      oscillator.stop();
      oscillator.disconnect();
      oscillator = context.createOscillator();
      this.setState({
        oscillator: oscillator
      });   // setState object
    }       // if tone is playing

    // set isPlaying based on upcoming props
    // check for a valid (>0) frequency and gain value and set
    //   isPlaying true if so
    var isPlaying = (
        (nextProps.frequency > 0) &&
        (nextProps.amplitude > 0)
    );

    // if isPlaying isn't already at the correct value, set it
    if(isPlaying !== this.state.isPlaying) {
      this.setState({
        isPlaying: isPlaying
      });
    }       // if we need to update isPlaying

    // if sound is to play, play sound
    if(isPlaying) {
      gain.gain.value = amplitude;
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(0);
    }       // if sound is to play
  },        // componentWillReceiveProps function

  componentWillUnmount: function() {
    if(this.state.isPlaying) {
      this.state.oscillator.stop();
      this.state.oscillator.disconnect();
    }
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {

    // visual aspect of the component
    return(
      <div>
        Rendered AudioOutTone
      </div>
    );  // return value
  }     // render function
});     // AudioOut class

// export AudioOut for other modules to use
module.exports = AudioOutTone;
