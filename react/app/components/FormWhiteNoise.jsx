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
	getInitialState function

	Set up initial playing state to false (not playing)
	*/
  getInitialState: function() {
    return {
      playing: false
    };
  },

  /*
  playWhiteNoise function

  Invoked from a stop noise button press

  updates playing state, sends frequencyObj to playWhiteNoise prop
  */
  playWhiteNoise: function(e) {
    // prevent page from reloading
    e.preventDefault();

    // set playing state
    this.setState({
      playing: true
    });       // setState

    var whiteNoiseGain = this.refs.whiteNoiseGain.value;

    this.props.playWhiteNoise([], [], whiteNoiseGain);
  },          // playWhiteNoise function

  /*
  stopWhiteNoise function

  Invoked from a stop noise button press

  updates playing state, sends empty frequencyObj to playWhiteNoise prop
  */
  stopWhiteNoise: function(e) {
    // prevent page from reloading
    e.preventDefault();

    // set playing state
    this.setState({
      playing: false
    });     // setState

    // send empty frequency to playWhiteNoise prop
    this.props.playWhiteNoise([], []);
  },        // stopWhiteNoise function

  /*
  renderPlayWhiteNoiseButton function

  renders the button to play or stop white noise, depending on the playing
  state
  */
  renderPlayWhiteNoiseButton: function() {
    if(this.state.playing) {
      return (
        <button className='secondary button' id='stopSound'
          onClick={this.stopWhiteNoise}>Stop White Noise</button>
      );        // return value
    } else {
      return (
        <button className='button' id='startSound'
          onClick={this.playWhiteNoise}>Play White Noise</button>
      );        // return value
    }           // if..else state playing set
  },            // renderPlayWhiteNoiseButton

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <fieldset className="frequency-fieldset">
          <legend>White Noise</legend>
          <div className="row">
            <div className="columns small-12 medium-6">
              <label htmlFor='whiteNoiseGain' >Gain:</label>
              <input type='number' ref='whiteNoiseGain' name='whiteNoiseGain'
                id='whiteNoiseGain' maxLength="5" defaultValue="10"/>
            </div>
          </div>
        </fieldset>
        <div className='row'>
          <div className='columns small-12 medium-6'>
            {this.renderPlayWhiteNoiseButton()}
          </div>
        </div>
      </div>
    );        // return value
  }           // render function
});           // FormWhiteNoise class

// export FormWhiteNoise for other modules to use
module.exports = FormWhiteNoise;
