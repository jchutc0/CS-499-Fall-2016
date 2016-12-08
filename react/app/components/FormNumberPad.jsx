/*****
FormNumberPad class

The purpose of this class is to display the numeric keypad and send requests
to play sound encoded from either the keypad press or keyboard input
*****/

// Require the React framework
var React = require('react');

// Require the number pad button class
var FormButton = require('FormButton');


// Create the FormNav class
var FormNumberPad = React.createClass({

  // require the playFrequency function as a passed property
  propTypes: {
    playFrequency: React.PropTypes.func.isRequired
  },      // propTypes

  //// Component constants ////
  // The gain (volume) for the dialpad -- needs to be 0-10
  gain: 4,

  // An object of key events and their corresponding number pad entries
  keyObject: {
    '0' : 48,
    '1' : 49,
    '2' : 50,
    '3' : 51,
    '4' : 52,
    '5' : 53,
    '6' : 54,
    '7' : 55,
    '8' : 56,
    '9' : 57
  },

  // An object of number pad entries and their corresponding frequencies
  frequencyObject: {
    '1': [1209, 697],
    '2': [1336, 697],
    '3': [1477, 697],
    '4': [1209, 770],
    '5': [1336, 770],
    '6': [1477, 770],
    '7': [1209, 852],
    '8': [1336, 852],
    '9': [1477, 852],
    '*': [1209, 941],
    '0': [1336, 941],
    '#': [1477, 941]
  },

  getInitialState: function() {
    return {
      gain: 5
    };
  },

  /*
  playTelephony function

  Takes a buttonID and sends a corresponding DTMF frequency pair to the
  playFrequency prop
  */
  playTelephony: function(buttonID, playing) {
    // gain value to send
    var gain = this.gain;

    if(this.frequencyObject[buttonID] !== undefined) {
      if(playing) {
        return this.props.playFrequency(
          this.frequencyObject[buttonID],
          [this.state.gain, this.state.gain]
        );   // playFrequency call
      } else {
        return this.props.playFrequency();
      }
    }      // if valid frequency
    else {
      return this.props.playFrequency();
    }     // if invalid frequency
  },      // playTelephony function

  handleGainSliderChange: function(e) {
    e.preventDefault();
    this.setState({
      gain: this.refs.gainSlider.value
    });
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    var renderButton = (label) => {
      return (
        <FormButton buttonID={label}
          buttonLabel={label}
          downClass={"button numberPad"}
          upClass={"hollow button numberPad"}
          callback={this.playTelephony}
          keyCode={this.keyObject[label]} />
      );
    };
    return (
      <div className='numberPadForm'>
        <div className='row'>
          <div className='columns small-12 medium-6 text-center'>
            {renderButton('1')}
            {renderButton('2')}
            {renderButton('3')}
            <br/>
            {renderButton('4')}
            {renderButton('5')}
            {renderButton('6')}
            <br/>
            {renderButton('7')}
            {renderButton('8')}
            {renderButton('9')}
            <br/>
            {renderButton('*')}
            {renderButton('0')}
            {renderButton('#')}
          </div>
          <div className='columns small-12 medium-6'>
            <label htmlFor='gainSlider'>Volume:</label>
            <input type='range' className='slider'
              name='gainSlider' ref='gainSlider'
              min='0' max='10'
              defaultValue='5'
              onChange={this.handleGainSliderChange}/>
            {this.props.children}
          </div>
        </div>
      </div>
    );        // return value
  }           // render function
});           // FormNumberPad class

// export FormNumberPad for other modules to use
module.exports = FormNumberPad;
