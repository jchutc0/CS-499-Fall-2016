/*****
FormFrequencyTone class

The purpose of this class is to take input from the user about one or two
tones and send those tones back to the calling class through the required
playFrequency function
*****/

// Require the React framework
var React = require('react');

// create the FormFrequencyTone class
var FormFrequencyTone = React.createClass({
  // require the playFrequency function as a passed property
  propTypes: {
    updateTone: React.PropTypes.func.isRequired,
    toneID: React.PropTypes.string.isRequired,
    defaultTone: React.PropTypes.number
  },      // propTypes object

  minFrequency: 20,
  maxFrequency: 20000,
  minFrequencySlider: Math.ceil(Math.log2(20)),
  maxFrequencySlider: Math.floor(Math.log2(20000)),
  maxGain: 10,

  getDefaultProps: function() {
    return {
      defaultTone: 440
    };
  },

  checkValidSubmit: function() {
    var {frequency, gain} = this.refs;
    var valid = true;
    if(gain.value > this.maxGain) {
      valid = false;
    } else if(gain.value <= 0) {
      valid = false;
    }
    if(frequency.value < this.minFrequency) {
      frequency.value = this.minFrequency;
      valid = false;
    } else if(frequency.value > this.maxFrequency) {
      frequency.value = this.maxFrequency;
      valid = false;
    }
    if(!valid) {
      gain.value = 0;
    }
    return valid;
  },

  handleFrequencySliderChange: function(e) {
    var logOfFrequency = Math.floor(Math.log2(this.refs.frequency.value));
    if(logOfFrequency != this.refs.frequencySlider.value) {
      this.refs.frequency.value = Math.pow(2, this.refs.frequencySlider.value);
    }
    var valid = this.checkValidSubmit();
    this.props.updateTone(valid,
      this.refs.frequency.value, this.refs.gain.value);
  },      // handleFrequencySliderChange

  handleGainChange: function(e) {
    e.preventDefault();
    var logOfFrequency = Math.floor(Math.log2(this.refs.frequency.value));

    this.refs.frequencySlider.value = logOfFrequency;
    var valid = this.checkValidSubmit();
    this.props.updateTone(valid,
      this.refs.frequency.value, this.refs.gain.value);
  },      // handleGainChange

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div className='frequency-form'>
        <form onSubmit={this.handleGainChange}>
          <fieldset>
            <legend>{this.props.toneID}</legend>
            <div>
              <input type='number' ref='frequency' name='frequency'
                id='frequency' maxLength="5"
                defaultValue={this.props.defaultTone}
                min={this.minFrequency}
                max={this.maxFrequency}/>
            </div>
            <div>
              <label htmlFor='frequencySlider'>Frequency:</label>
              <input type='range' className='slider'
                name='frequencySlider' ref='frequencySlider'
                min={this.minFrequencySlider} max={this.maxFrequencySlider}
                defaultValue={this.props.defaultTone}
                onChange={this.handleFrequencySliderChange}/>
            </div>
            <div>
              <label htmlFor='gain' >Volume:</label>
                <input type='range' className='slider'
                  name='gain' ref='gain'
                  min='0' max='10'
                  defaultValue='0'
                  onChange={this.handleGainChange}/>
            </div>
          </fieldset>
        </form>
      </div>
    );      // return value
  }         // render function
});         // FormFrequencyTone class

// export FormFrequencyTone for other modules to use
module.exports = FormFrequencyTone;
