var React = require('react');

var FormFrequency = React.createClass({
  propTypes: {
    playFrequency: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      playing: false
    };
  },

  playUserFrequency: function(e) {
    e.preventDefault();
    this.setState({
      playing: true
    });
    var frequencyObject = {
      frequency1: this.refs.frequency1.value,
      gain1: this.refs.gain1.value,
      frequency2: this.refs.frequency2.value,
      gain2: this.refs.gain2.value
    };
    this.props.playFrequency(frequencyObject);
  },

  stopUserFrequency: function(e) {
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
    this.props.playFrequency(frequencyObject);
  },

  clearForm: function(e) {
    this.stopUserFrequency(e);
    this.refs.frequency1.value = '';
    this.refs.gain1.value = '';
    this.refs.frequency2.value = '';
    this.refs.gain2.value = '';
  },

  renderPlayFrequencyButton: function() {
    if(this.state.playing) {
      return (
        <button className='secondary button' id='stopSound' onClick={this.stopUserFrequency}>Stop Frequency</button>
      );
    } else {
      return (
        <button className='button' id='startSound' onClick={this.playUserFrequency}>Play Frequency</button>
      );
    }
  },

  renderPlayWhiteNoiseButton: function() {
    if(this.state.playing) {
      return (
        <button className='secondary button' id='stopSound' onClick={this.stopUserFrequency}>Stop Frequency</button>
      );
    } else {
      return (
        <button className='button' id='startSound' onClick={this.playUserFrequency}>Play Frequency</button>
      );
    }
  },

  render: function() {
    return (
      <div>
        <fieldset className="frequency-fieldset">
          <legend>Tone 1</legend>
          <div className="row">
            <div className="columns small-12 medium-6">
              <label htmlFor='frequency1'>Frequency:</label>
              <input type='number' ref='frequency1' name='frequency1' id='frequency1' maxLength="5" />
            </div>
            <div className="columns small-12 medium-6">
              <label htmlFor='gain1' >Gain:</label>
              <input type='number' ref='gain1' name='gain1' id='gain1' maxLength="5" />
            </div>
          </div>
        </fieldset>
        <fieldset className="frequency-fieldset">
          <legend>Tone 2</legend>
            <div className="row">
              <div className="columns small-12 medium-6">
                <label htmlFor='frequency2'>Frequency:</label>
                <input type='number' ref='frequency2' name='frequency2' id='frequency2' maxLength="5" />
              </div>
              <div className="columns small-12 medium-6">
                <label htmlFor='gain2' >Gain:</label>
                <input type='number' ref='gain2' name='gain2' id='gain2' maxLength="5" />
              </div>
          </div>
        </fieldset>
        <div className='row'>
          <div className='columns small-12 medium-6'>
            {this.renderPlayFrequencyButton()}
          </div>
          <div className='columns small-12 medium-6'>
            <button className='button' id='clearForm' onClick={this.clearForm}>Clear Form</button><br/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FormFrequency;
