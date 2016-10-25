/*****
AudioOutWhiteNoise Class

The purpose of this class is to act as a white noise generator
*****/

// Require the React framework
var React = require('react');

// create the AudioOut class
var AudioOutWhiteNoise = React.createClass({

  // set up whiteNoiseBufferSize constant
  whiteNoiseBufferSize: 4096,

  propTypes: {
    amplitude   : React.PropTypes.number.isRequired,
    context     : React.PropTypes.object.isRequired
  },

  /*
  getInitialState function

  Creates the whiteNoise script processor to generate white noise and
  associates it with the local generateWhiteNoise function.
  */
  getInitialState: function() {
    // pull in the AudioContext and amplitude from props
    var {context, amplitude} = this.props;

    // define the white noise script processor
    var whiteNoise = context.createScriptProcessor(this.whiteNoiseBufferSize, 1, 1);

    // set the script processor to another function in this class
    whiteNoise.onaudioprocess = this.generateWhiteNoise;

    if(amplitude > 0) {
      whiteNoise.connect(context.destination);
    }     // if whiteNoise > 0

    return {
      whiteNoise: whiteNoise
    };      // return value
  },        // getInitialState function


  /*
  componentWillUnmount function

  This function is called as the component is no longer rendering

  Stops the white noise generator
  */
  componentWillUnmount: function() {
    this.state.whiteNoise.disconnect();
  },      // componentWillUnmount function

  /*
  generateWhiteNoise function

  event handler that uses random values to generate randomized values to send
  to the sound generator to simulate white noise

  Takes: e event from onaudioprocess from whiteNoise state value
  */
  generateWhiteNoise: function(e) {
    var bufferSize = this.whiteNoiseBufferSize;

    var output = e.outputBuffer.getChannelData(0);

    // loop through the sound buffer and plug in random numbers
    for(var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 * this.props.amplitude - 1;
    }       // randomize for loop
  },        // generateWhiteNoise function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    // visual aspect of the component
    return(
      <div>
        Rendered AudioOutWhiteNoise
      </div>
    );  // return value
  }     // render function
});     // AudioOutWhiteNoise class

// export AudioOutWhiteNoise for other modules to use
module.exports = AudioOutWhiteNoise;
