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
  // require props to be passed
  //  - updateTone: communicates with the FormFrequency class (a function)
  //  - toneID: used to specify which tone generator this is, also the value
  //    that goes in the legend at the top of the box (a text string)
  //  - defaultTone: the default tone for the module - set to 440 in
  //    getDefaultProps if not passed
  propTypes: {
    updateTone: React.PropTypes.func.isRequired,
    toneID: React.PropTypes.string.isRequired,
    defaultTone: React.PropTypes.number
  },      // propTypes object

  //// Class constants ////
  // the lowest and highest frequency the generator can handle
  //  NB: when changing these, also change the values in the frequency slider
  //  min and max calculations below
  minFrequency: 20,
  maxFrequency: 20000,

  // the highest and lowest values for the frequency slider
  minFrequencySlider: Math.ceil(8 * Math.log2(20)),
  maxFrequencySlider: Math.floor(8 * Math.log2(20000)),

  // the highest gain value the generator can handle
  maxGain: 10,

  // the value to multiply the log values by to get more slider ranges
  //  NB: when changing this, also change the value in the frequency slider
  //  min and max calculations above
  logScale: 8,

  //// Class functions ////
  /*
  getDefaultProps function
  Invoked on module creation

  If defaultTone prop not passed, sets it to 440
  */
  getDefaultProps: function() {
    return {
      defaultTone: 440
    };
  },          // getDefaultProps function

  /*
  adjustedLog function
  Called by various functions to generate the adjusted log of a number

  It calculates the base-2 logarithm of a value, multiplies it by a constant,
  and rounds it down.

  The constant is involved so the slider has more precision. With no constant,
  20 - 20k makes 5 - 14, or 9 divisions. With a constant of 8, it makes 35 -
  114, or 79 divisions
  */
  adjustedLog: function(value) {
    return Math.floor(this.logScale * Math.log2(value));
  },          // adjustedLog function

  /*
  checkValidSubmit function
  Called from handleFrequencySliderChange and handleGainChange functions

  Checks the values for the sliders and text box
  On an invalid entry, sets the gain to 0 and adjusts the frequency to the low
  value (if too low) or the high value (if too high)
  */
  checkValidSubmit: function() {
    // pull frequency and gain from the refs
    var {frequency, gain} = this.refs;

    // begin by assuming a valid entry
    var valid = true;

    // if the max gain is too low or too high, not valid
    //   (not valid sets the gain to 0 at the end, so no value changes needed)
    if(gain.value > this.maxGain) {
      valid = false;
    } else if(gain.value <= 0) {
      valid = false;
    }     // if invalid gain

    // if the frequency is too low or too high, change the frequecy to the
    //  low or high value and set not valid
    if(frequency.value < this.minFrequency) {
      frequency.value = this.minFrequency;
      valid = false;
    } else if(frequency.value > this.maxFrequency) {
      frequency.value = this.maxFrequency;
      valid = false;
    }   // if invalid frequency

    // if not valid, set the gain slider to 0 to stop the generator
    if(!valid) {
      gain.value = 0;
    }   // if not valid

    // return whether or not the form was valid (mostly for testing)
    return valid;
  },          // checkValidSubmit function

  /*
  handleFrequencySliderChange function
  Invoked when the frequency slider value is changed

  Checks to see if the slider matches the adjusted log of the text box (to make
  the slider work on a logarithmic scale) and sets the box if not. Then checks
  to make sure the values are valid (with checkValidSubmit) and sends the tone
  to FormFrequency (with updateTone).
  */
  handleFrequencySliderChange: function(e) {
    // Get the adjusted logarithmic value of the frequency text box
    var logOfFrequency = this.adjustedLog(this.refs.frequency.value);

    // if the slider and the box don't match, set the box
    if(logOfFrequency != this.refs.frequencySlider.value) {
      this.refs.frequency.value = Math.floor(Math.pow(
        2, this.refs.frequencySlider.value / this.logScale
      ));
    }         // if the slider and the box don't match
    
    // check the values to make sure we have a valid submission and turn off
    //  the tone if not
    this.checkValidSubmit();

    // send the tone up to FormFrequency
    this.props.updateTone(this.props.toneID,
      this.refs.frequency.value, this.refs.gain.value);
    },      // handleFrequencySliderChange function

    /*
    handleGainChange function
    Invoked when the gain slider value is changed or when the user presses enter
    in the text box

    Checks to see if the slider matches the adjusted log of the text box (to make
    the slider work on a logarithmic scale) and sets the box if not. Then checks
    to make sure the values are valid (with checkValidSubmit) and sends the tone
    to FormFrequency (with updateTone).
    */
    handleGainChange: function(e) {
      // preventDefault so we don't reload the page when the user presses enter
      e.preventDefault();

      // Get the adjusted logarithmic value of the frequency text box
      var logOfFrequency = this.adjustedLog(this.refs.frequency.value);

      // sets the frequency slider to match the text box
      this.refs.frequencySlider.value = logOfFrequency;

      // check the values to make sure we have a valid submission and turn off
      //  the tone if not
      this.checkValidSubmit();

      // send the tone up to FormFrequency
      this.props.updateTone(this.props.toneID,
        this.refs.frequency.value, this.refs.gain.value);
      },      // handleGainChange function

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
                    defaultValue={this.adjustedLog(this.props.defaultTone)}
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
