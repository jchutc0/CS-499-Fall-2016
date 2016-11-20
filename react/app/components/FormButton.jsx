/*****
FormButton class

The purpose of this class is to display the numeric keypad and send requests
to play sound encoded from either the keypad press or keyboard input
*****/

// Require the React framework
var React = require('react');

// Create the FormNav class
var FormButton = React.createClass({

  // require passed properties:
  //   - the playFrequency function to send a play/stop tone to the parent
  //   - the text string label for the button (like '0' or '#')
  //   - boolean isPlaying value
  propTypes: {
    buttonID        : React.PropTypes.string.isRequired,
    buttonLabel     : React.PropTypes.string,
    downClass       : React.PropTypes.string,
    upClass         : React.PropTypes.string,
    callback        : React.PropTypes.func.isRequired,
    keyCode         : React.PropTypes.number
  },      // propTypes

  /*
  getInitialState function

  Sets the initial state from the props
  */
  getInitialState: function() {
    return ({
      isPlaying: false
    });     // return value
  },        // getInitialState function

  changeButton: function(newStatus) {
    if(this.state.isPlaying != newStatus) {
      this.setState({
        isPlaying: newStatus
      });
      this.props.callback(this.props.buttonID, newStatus);
    }   // if state needs to change
  },    // changeButton

  /*
  handleMouseDown function

  Handles the onMouseDown event

  If the tone is not playing, calls playFrequency from props with the frequency
  label and true to play
  */
  handleMouseDown: function(e) {
    // prevent page from reloading
    e.preventDefault();
    this.changeButton(true);
  },    // handleMouseDown


  /*
  handleMouseUp function

  Handles the onMouseUp event

  If the tone is playing, calls playFrequency from props with the frequency
  label and false to stop
  */
  handleMouseUp: function(e) {
    // prevent page from reloading
    e.preventDefault();
    this.changeButton(false);
  },    // handleMouseUp

  /*
  componentWillMount function

  This function is invoked as the component mounts

  Sets up the keyup and keydown listeners to handle key presses
  */
  componentWillMount: function() {
    if(Math.floor(this.props.keyCode) > 0) {
      window.addEventListener('keydown', this.handleKeypress);
      window.addEventListener('keyup', this.handleKeyRelease);
    }
  },      // componentWillMount

  /*
  componentWillUnmount function

  This function is invoked as the component unmounts

  Removes the key press listeners
  */
  componentWillUnmount: function() {
    if(Math.floor(this.props.keyCode) > 0) {
      window.removeEventListener('keydown', this.handleKeypress);
      window.removeEventListener('keyup', this.handleKeyRelease);
    }
  },      // componentWillUnmount

  /*
  handleKeypress function

  Invoked from the keypress listener

  Decodes the key press for a number press and sends it to the playTelephony
  function
  */
  handleKeypress: function(key) {
    if(key.keyCode === this.props.keyCode) {
      this.changeButton(true);
    }
  },          // handleKeypress

  /*
  handleKeyRelease function

  Invoked from the keypress listener

  Sends empty frequency (stop sound) to the playFrequency prop
  */
  handleKeyRelease: function(key) {
    if(key.keyCode === this.props.keyCode) {
      this.changeButton(false);
    }
  },      // handleKeyRelease function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    var renderButtonClass = () => {
      if(this.state.isPlaying) {
        return this.props.downClass;
      } else {
        return this.props.upClass;
      }
    };

    return (
      <button className={renderButtonClass()}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseOut={this.handleMouseUp}>{this.props.buttonLabel}</button>
    );        // return for render function
  }           // render function
});           // FormButton class

// export FormButton for other modules to use
module.exports = FormButton;
