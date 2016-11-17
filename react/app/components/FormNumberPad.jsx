/*****
FormNumberPad class

The purpose of this class is to display the numeric keypad and send requests
to play sound encoded from either the keypad press or keyboard input
*****/

// Require the React framework
var React = require('react');

// Require the number pad button class
var FormNumberPadButton = require('FormNumberPadButton');


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
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9'
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

  /*
  getInitialState function

  Sets the initial state
  */
  getInitialState: function() {
    return ({
      isPlaying: {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false,
        '9': false,
        '*': false,
        '0': false,
        '#': false
      }
    });     // return value
  },        // getInitialState function


  /*
  componentWillMount function

  This function is invoked as the component mounts

  Sets up the keyup and keydown listeners to handle key presses
  */
  componentWillMount: function() {
    window.addEventListener('keydown', this.handleKeypress);
    window.addEventListener('keyup', this.handleKeyRelease);
  },      // componentWillMount

  /*
  componentWillUnmount function

  This function is invoked as the component unmounts

  Removes the key press listeners
  */
  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.handleKeypress);
    window.removeEventListener('keyup', this.handleKeyRelease);
  },      // componentWillUnmount

  /*
  handleKeypress function

  Invoked from the keypress listener

  Decodes the key press for a number press and sends it to the playTelephony
  function
  */
  handleKeypress: function(key) {
    if(this.keyObject[key.keyCode] !== undefined) {
      this.playTelephony(this.keyObject[key.keyCode], true);
    }
  },          // handleKeypress

  /*
  handleKeyRelease function

  Invoked from the keypress listener

  Sends empty frequency (stop sound) to the playFrequency prop
  */
  handleKeyRelease: function(key) {
    if(this.keyObject[key.keyCode] !== undefined) {
      this.playTelephony(this.keyObject[key.keyCode], false);
    }
  },      // handleKeyRelease function

  /*
  playTelephony function

  Takes a buttonID and sends a corresponding DTMF frequency pair to the
  playFrequency prop
  */
  playTelephony: function(buttonID, playing) {
    // gain value to send
    var gain = this.gain;

    if(this.frequencyObject[buttonID] !== undefined) {
      var isPlaying = {
        ...this.state.isPlaying,
        [buttonID]: playing
      };
      this.setState({
        isPlaying: isPlaying
      });
      if(playing) {
        return this.props.playFrequency(
          this.frequencyObject[buttonID],
          [gain, gain]
        );   // playFrequency call
      } else {
        return this.props.playFrequency([], []);
      }
    }      // if valid frequency
    else {
      return this.props.playFrequency([], []);
    }     // if invalid frequency
  },      // playTelephony function

  /*
  stopSound function

  Invoked from key release and mouse up on the keypad

  Sends empty sound back to playFrequency prop to stop current sound if any
  */
  stopSound: function() {
    return this.props.playFrequency([], []);
  },        // stopSound function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    var renderButton = (label) => {
      return (
        <FormNumberPadButton playFrequency={this.playTelephony}
          buttonLabel={label}
          isPlaying={this.state.isPlaying[label]} />
      );
    };
    return (
      <div>
        <fieldset>
          <legend>Telephony</legend>
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
          <br/>
        </fieldset>
      </div>
    );        // return value
  }           // render function
});           // FormNumberPad class

// export FormNumberPad for other modules to use
module.exports = FormNumberPad;
