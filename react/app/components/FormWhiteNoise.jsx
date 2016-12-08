/*****
FormWhiteNoise class

The purpose of this class is to display the form for the white noise class
*****/

// Require the React framework
var React = require('react');

// Create the FormWhiteNoise class
var FormWhiteNoise = React.createClass({

  // require the playWhiteNoise function as a passed property
  propTypes: {
    playWhiteNoise: React.PropTypes.func.isRequired
  },      // propTypes

  /*
  playWhiteNoise function

  Invoked when the volume slider changes values

  Sends values to playWhiteNoise prop - either empty for stop (0 volume) or
  gain value to play noise.
  */
  playWhiteNoise: function(e) {
    // prevent page from reloading
    e.preventDefault();

    var whiteNoiseGain = parseInt(this.refs.whiteNoiseGain.value);
    var playWhiteNoise = this.props.playWhiteNoise;

    // if we have 0 gain, send a stop all sounds command and exit
    //   otherwise, send the gain to the white noise generator
    if(whiteNoiseGain <= 0) {
      return playWhiteNoise();
    } else {
      return playWhiteNoise([], [], whiteNoiseGain);
    }
  },          // playWhiteNoise function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div className='whitenoise-form'>
        <fieldset>
          <legend>White Noise Volume</legend>
          <input type='range' className='slider'
            name='whiteNoiseGain' ref='whiteNoiseGain'
            min='0' max='10' defaultValue='0'
            onChange={this.playWhiteNoise}/>
        </fieldset>
        {this.props.children}
      </div>
    );        // return value
  }           // render function
});           // FormWhiteNoise class

// export FormWhiteNoise for other modules to use
module.exports = FormWhiteNoise;
