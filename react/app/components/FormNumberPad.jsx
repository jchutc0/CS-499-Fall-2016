/*****
FormNumberPad class

The purpose of this class is to display the numeric keypad and send requests
to play sound encoded from either the keypad press or keyboard input
*****/

// Require the React framework
var React = require('react');

// Create the FormNav class
var FormNumberPad = React.createClass({

  // require the playFrequency function as a passed property
  propTypes: {
    playFrequency: React.PropTypes.func.isRequired
  },      // propTypes

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
    switch (key.keyCode) {
      case (49):
      // 1 key
      this.playTelephony(0);
      break;
      case (50):
      // 2 key
      this.playTelephony(1);
      break;
      case (51):
      // 3 key
      this.playTelephony(2);
      break;
      case (52):
      // 4 key
      this.playTelephony(3);
      break;
      case (53):
      // 5 key
      this.playTelephony(4);
      break;
      case (54):
      // 6 key
      this.playTelephony(5);
      break;
      case (55):
      // 7 key
      this.playTelephony(6);
      break;
      case (56):
      // 8 key
      this.playTelephony(7);
      break;
      case (57):
      // 9 key
      this.playTelephony(8);
      break;
      case (48):
      // 0 key
      this.playTelephony(10);
      break;
    };        // switch statement
  },          // handleKeypress

  /*
	handleKeyRelease function

  Invoked from the keypress listener

  Sends empty frequency (stop sound) to the playFrequency prop
	*/
  handleKeyRelease: function(key) {
    if((key.keyCode > 47) && key.keyCode < 58) {
      return this.stopSound();
    }     // if keyup is a numeric key
  },      // handleKeyRelease function

  /*
  playTelephony function

  Takes a buttonID and sends a corresponding DTMF frequency pair to the
  playFrequency prop
  */
  playTelephony: function(buttonID) {
    // gain value to send
    var gain = .01;
    var frequency1, frequency2;

    switch(buttonID)
    {
      case 0:
      //1 Key
      frequency1 = 1209;
      frequency2 = 697;
      break;
      case 1:
      //2 Key
      frequency1 = 1336;
      frequency2 = 697;
      break;
      case 2:
      //3 Key
      frequency1 = 1477;
      frequency2 = 697;
      break;
      case 3:
      //4 Key
      frequency1 = 1209;
      frequency2 = 770;
      break;
      case 4:
      //5 Key
      frequency1 = 1336;
      frequency2 = 770;
      break;
      case 5:
      //6 Key
      frequency1 = 1477;
      frequency2 = 770;
      break;
      case 6:
      //7 Key
      frequency1 = 1209;
      frequency2 = 852;
      break;
      case 7:
      //8 Key
      frequency1 = 1336;
      frequency2 = 852;
      break;
      case 8:
      //9 Key
      frequency1 = 1477;
      frequency2 = 852;
      break;
      case 9:
      //* Key
      frequency1 = 1209;
      frequency2 = 941;
      break;
      case 10:
      //0 Key
      frequency1 = 1336;
      frequency2 = 941;
      break;
      case 11:
      //# Key
      frequency1 = 1477;
      frequency2 = 941;
      break;
      default:
      frequency1 = 0;
      frequency2 = 0;
      break;
    }     // switch statement

    return this.props.playFrequency(
      [frequency1, frequency2], [gain, gain]
    );   // playFrequency call
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
    return (
      <div>
        <fieldset>
          <legend>Telephony</legend>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(0)}}
            onMouseUp={() => {this.stopSound()} }>1</button>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(1)}}
            onMouseUp={() => {this.stopSound()} }>2</button>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(2)}}
            onMouseUp={() => {this.stopSound()} }>3</button>
          <br/>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(3)}}
            onMouseUp={() => {this.stopSound()} }>4</button>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(4)}}
            onMouseUp={() => {this.stopSound()} }>5</button>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(5)}}
            onMouseUp={() => {this.stopSound()} }>6</button>
          <br/>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(6)}}
            onMouseUp={() => {this.stopSound()} }>7</button>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(7)}}
            onMouseUp={() => {this.stopSound()} }>8</button>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(8)}}
            onMouseUp={() => {this.stopSound()} }>9</button>
          <br/>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(9)}}
            onMouseUp={() => {this.stopSound()} }>*</button>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(10)}}
            onMouseUp={() => {this.stopSound()} }>0</button>
          <button className="hollow button"
            onMouseDown={() => {this.playTelephony(11)}}
            onMouseUp={() => {this.stopSound()} }>#</button>
          <br/>
        </fieldset>
      </div>
    );        // return value
  }           // render function
});           // FormNumberPad class

// export FormNumberPad for other modules to use
module.exports = FormNumberPad;
