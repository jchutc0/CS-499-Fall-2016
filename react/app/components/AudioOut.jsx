/*****
AudioOut Class

The purpose of this class is to make decisions about which other audio
classes to render
*****/

// Require the React framework
var React = require('react');

// Require AudioOut subclasses to render
var AudioOutTone = require('AudioOutTone');
var AudioOutWhiteNoise = require('AudioOutWhiteNoise');

// create the AudioOut class
var AudioOut = React.createClass({

  // Require the context object as a prop
  propTypes: {
    context     : React.PropTypes.object.isRequired
  },  // propTypes

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
        {renderAudioOut(this.props, this.props.context)}
      </div>
    );  // return value
  }     // render function
});     // AudioOut class

// export AudioOut for other modules to use
module.exports = AudioOut;
