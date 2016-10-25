/*****
AudioOut Class

The purpose of this class is to hold the audio context and make decisions about
which other audio classes to render
*****/

// Require the React framework
var React = require('react');

// Require AudioOut subclasses to render
var AudioOutTone = require('AudioOutTone');
var AudioOutWhiteNoise = require('AudioOutWhiteNoise');

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

  Creates the audio context used to generate sound and stores it in the state
  */
  getInitialState: function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // set up the AudioContext
    var context = new AudioContext();

    return {
      context: context
    };      // return value
  },        // getInitialState function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {

    /*
    renderAudioOut function

    Looks at the props.frequencyObj and either renders AudioOutWhiteNoise if
    a whiteNoise value has been passed down or else renders the dual tone
    generator
    */
    function renderAudioOut(props, context) {
      // set up the HTML for the dual tone generator
      var toneGenerator = (
        <div>
          <AudioOutTone frequency = {Number(props.frequencyObj.frequency1)}
            amplitude = {Number(props.frequencyObj.gain1)}
            context = {context} />
          <AudioOutTone frequency = {Number(props.frequencyObj.frequency2)}
            amplitude = {Number(props.frequencyObj.gain2)}
            context = {context} />
        </div>
      );
      // set up the HTML for the white noise generator
      var whiteNoiseGenerator = (
        <div>
          <AudioOutWhiteNoise amplitude = {Number(props.frequencyObj.whiteNoise)}
            context = {context}/>
        </div>
      );

      // check for props.frequencyObj.whiteNoise -- generate white noise if
      //   present, generate tones if not
      if (props.frequencyObj.whiteNoise !== undefined) {
        return whiteNoiseGenerator;
      } else {
        return toneGenerator;
      }     // check props if..else statement
    }       // renderAudioOut function

    // visual aspect of the component
    return(
      <div>
        Rendered AudioOut
        {renderAudioOut(this.props, this.state.context)}
      </div>
    );  // return value
  }     // render function
});     // AudioOut class

// export AudioOut for other modules to use
module.exports = AudioOut;
