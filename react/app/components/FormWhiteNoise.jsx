// Require the React framework
var React = require('react');

var FormWhiteNoise = React.createClass({
  propTypes: {
    playWhiteNoise: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      playing: false
    };
  },

  playWhiteNoise: function(e) {
    e.preventDefault();
    this.setState({
      playing: true
    });

    var whiteNoiseGain = (this.refs.whiteNoiseGain.value % 100) / 100.0;

    var frequencyObject = {
      whiteNoise: whiteNoiseGain
    };
    this.props.playWhiteNoise(frequencyObject);
  },

  stopWhiteNoise: function(e) {
    e.preventDefault();
    this.setState({
      playing: false
    });
    var frequencyObject = {
      frequency1: 0,
      gain1: 0,
      frequency2: 0,
      gain2: 0
    };
    this.props.playWhiteNoise(frequencyObject);
  },

  renderPlayWhiteNoiseButton: function() {
    if(this.state.playing) {
      return (
        <button className='secondary button' id='stopSound' onClick={this.stopWhiteNoise}>Stop White Noise</button>
      );
    } else {
      return (
        <button className='button' id='startSound' onClick={this.playWhiteNoise}>Play White Noise</button>
      );
    }
  },

  render: function() {
    return (
      <div>
        <fieldset className="frequency-fieldset">
          <legend>White Noise</legend>
          <div className="row">
            <div className="columns small-12 medium-6">
              <label htmlFor='whiteNoiseGain' >Gain:</label>
              <input type='number' ref='whiteNoiseGain' name='whiteNoiseGain' id='whiteNoiseGain' maxLength="5" />
            </div>
          </div>
        </fieldset>
        <div className='row'>
          <div className='columns small-12 medium-6'>
            {this.renderPlayWhiteNoiseButton()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FormWhiteNoise;
