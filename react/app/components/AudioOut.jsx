/*****
AudioOut Class

The purpose of this class is to generate and play audio data for the user
*****/

// Require the React framework
var React = require('react');

// create the AudioOut class
var AudioOut = React.createClass({

  /*
  getDefaultProps function

  Sets default component properties in the event the calling function did not
  pass them -- a frequency or a gain value of 0 will not play a tone
  */
  getDefaultProps: function() {
    return {
      frequencyObj: {
        frequency1: 0,
        gain1: 0,
        frequency2: 0,
        gain2: 0
      }   // return object
    };    // return value
  },      // getDefaultProps function

  /*
  getInitialState function

  Creates the audio context used to generate sound and the oscillator and gain
  values used to play a desired frequency. Also sets up an audio buffer for
  white noise generation and sets up the whiteNoise script processor to
  generate white noise. Also sets up isPlaying so the component knows if a
  sound is playing.
  */
  getInitialState: function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // set up the AudioContext
    var context = new AudioContext();
    // set up the frequency oscillators
    var oscillator1 = context.createOscillator();
    var oscillator2 = context.createOscillator();
    // set up the gain values
    var gain1 = context.createGain();
    var gain2 = context.createGain();

    // white noise sound buffer
    var bufferSize = 4096;
    // white noise script processor
    var whiteNoise = context.createScriptProcessor(bufferSize, 1, 1);

    // set the script processor to another function in this class
    whiteNoise.onaudioprocess = this.generateWhiteNoise;

    return {
      context: context,
      oscillator1: oscillator1,
      isPlaying1: false,
      gain1: gain1,
      oscillator2: oscillator2,
      gain2: gain2,
      isPlaying2: false,
      whiteNoise: whiteNoise,
      whiteNoiseBufferSize: bufferSize
    };      // return value
  },        // getInitialState function


  /*
  componentWillReceiveProps function

  This function is called before the component starts rendering to make it
  possible to set state variables based on the upcoming components without
  causing an infinite loop. Sets the next isPlaying1 and isPlaying2 state
  variables and the whiteNoise buffer

  Takes: nextProps - an object of props that are coming into the component
  for its upcoming render
  */
  componentWillReceiveProps: function(nextProps) {
    var context = this.state.context;
    var whiteNoise = this.state.whiteNoise;

    // turn off white noise generator
    whiteNoise.disconnect();

    // if frequency1 is playing, stop it and create a new oscillator to play
    //   it again if needed
    if(this.state.isPlaying1) {
      var oscillator1 = this.state.oscillator1;
      oscillator1.stop();
      oscillator1.disconnect();
      oscillator1 = context.createOscillator();
      this.setState({
        oscillator1: oscillator1
      });   // setState object
    }       // if frequency 1 is playing

    // if frequency2 is playing, stop it and create a new oscillator to play
    //   it again if needed
    if(this.state.isPlaying2) {
      var oscillator2 = this.state.oscillator2;
      oscillator2.stop();
      oscillator2 = context.createOscillator();
      this.setState({
        oscillator2: oscillator2,
      });   // setState object
    }       // if frequency 2 is playing

    // setting isPlaying1 and isPlaying2 based on upcoming props
    // step 1: both are true if playTelephony is passed because of the
    //   dual tone from telephony
    var isPlaying2;
    var isPlaying1 = isPlaying2 = (
      (nextProps.frequencyObj.playTelephony !== undefined) &&
      (nextProps.frequencyObj.playTelephony >= 0) &&
      (nextProps.frequencyObj.playTelephony <= 11)
    )

    // check frequency1 for a valid (>0) frequency and gain value and set
    //   isPlaying1 true if so (or if it was before)
    isPlaying1 = (
      (
        (nextProps.frequencyObj.frequency1 !== undefined) &&
        (nextProps.frequencyObj.frequency1 > 0) &&
        (nextProps.frequencyObj.gain1 > 0)
      ) || isPlaying1
    );

    // if isPlaying1 isn't already at the correct value, set it
    if(isPlaying1 !== this.state.isPlaying1) {
      this.setState({
        isPlaying1: isPlaying1
      });
    }       // if we need to update isPlaying1

    // check frequency2 for a valid (>0) frequency and gain value and set
    //   isPlaying2 true if so (or if it was before)
    var isPlaying2 = (
      (
        (nextProps.frequencyObj.frequency2 !== undefined) &&
        (nextProps.frequencyObj.frequency2 > 0) &&
        (nextProps.frequencyObj.gain2 > 0)
      ) || isPlaying2
    );

    // if isPlaying2 isn't already at the correct value, set it
    if(isPlaying2 !== this.state.isPlaying2) {
      this.setState({
        isPlaying2: isPlaying2
      });
    }       // if we need to update isPlaying2

    // if whiteNoise is defined, generate whiteNoiseBuffer
    if (nextProps.frequencyObj.whiteNoise !== undefined) {
      console.log('Will set next whiteNoise');
      var bufferSize = this.state.whiteNoiseBufferSize;
      var whiteNoiseBuffer = new Array(bufferSize);

      for(var i = 0; i < bufferSize; i++) {
        whiteNoiseBuffer[i] = Math.random() * 2 *
        nextProps.frequencyObj.whiteNoise - 1;
      }     // randomizing for loop
      for(var i = 0; i < 5; i++) {
        console.log('whiteNoiseBuffer[' + i + '] = ' + whiteNoiseBuffer[i]);
      }     // logging for loop
    }       // if white noise is requested
  },        // componentWillReceiveProps function

  /*
  playSound function

  This function takes two frequency and gain values and plays a tone based on
  those values

  Takes: frequency1, gain1 -- frequency and gain values for tone 1;
  frequency2, gain2 -- frequency and gain values for tone 2
  */
  playSound: function(frequency1, gain1, frequency2, gain2) {

    var context = this.state.context;
    var oscillator1 = this.state.oscillator1;
    var oscillator2 = this.state.oscillator2;
    var gainNode1 = this.state.gain1;
    var gainNode2 = this.state.gain2;

    // check valid (>0) values for frequency and gain for tone 1
    // if they are valid, generate tone 1
    if((frequency1 > 0) && (gain1 > 0)) {
        		gainNode1.gain.value = gain1;
        		oscillator1.frequency.value = frequency1;
        		oscillator1.connect(gainNode1);
        		gainNode1.connect(context.destination);

        		oscillator1.start(0);
    }     // if valid frequency, gain

    // check valid (>0) values for frequency and gain for tone 2
    // if they are valid, generate tone 2
    if((frequency2 > 0) && (gain2 > 0)) {
      gainNode2.gain.value = gain2;
      oscillator2.frequency.value = frequency2;
      oscillator2.connect(gainNode2);
      gainNode2.connect(context.destination);

      oscillator2.start(0);
    }     // if valid frequency, gain

  },      // playSound function

  /*
  generateWhiteNoise function

  event handler that uses random values to generate randomized values to send
  to the sound generator to simulate white noise

  Takes: e event from onaudioprocess from whiteNoise state value
  */
  generateWhiteNoise: function(e) {
    var bufferSize = this.state.whiteNoiseBufferSize;

    var output = e.outputBuffer.getChannelData(0);

    // loop through the sound buffer and plug in random numbers
    for(var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 * this.props.frequencyObj.whiteNoise - 1;
    }       // randomize for loop
  },        // generateWhiteNoise function

  /*
  playWhiteNoise function

  Enables the white noise generator
  */
  playWhiteNoise: function() {

    var context = this.state.context;
    var whiteNoise = this.state.whiteNoise;

    if(this.props.frequencyObj.whiteNoise > 0) {
      whiteNoise.connect(context.destination);
    }     // if whiteNoise > 0
  },      // playWhiteNoise function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    // if whiteNoise was passed in through the frequencyObj, playWhiteNoise
    if (this.props.frequencyObj.whiteNoise !== undefined) {
      this.playWhiteNoise();
    // otherwise, playSound with the frequencyObj values
    } else {
      this.playSound(
        this.props.frequencyObj.frequency1,
        this.props.frequencyObj.gain1,
        this.props.frequencyObj.frequency2,
        this.props.frequencyObj.gain2
      );
    }


    // visual aspect of the component
    return(
      <div>
        Rendered AudioOut
      </div>
    );  // return value
  }     // render function
});     // AudioOut class

// export AudioOut for other modules to use
module.exports = AudioOut;
