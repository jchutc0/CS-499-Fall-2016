/*****
FormKeyboardButton class

The purpose of this class is to display the numeric keypad and send requests
to play sound encoded from either the keypad press or keyboard input
*****/

// Require the React framework
var React = require('react');

// Create the FormNav class
var FormKeyboardButton = React.createClass({

  propTypes: {
    playFrequency: React.PropTypes.func.isRequired,
    note: React.PropTypes.string.isRequired,
    isPlaying: React.PropTypes.bool.isRequired
  },      // propTypes

  /*
  getInitialState function

  Sets the initial state from the props
  */
  getInitialState: function() {
    return ({
      isPlaying: this.props.isPlaying
    });     // return value
  },        // getInitialState function

  /*
  handleMouseDown function

  Handles the onMouseDown event

  If the tone is not playing, calls playFrequency from props with the frequency
  label and true to play
  */
  handleMouseDown: function(e) {
    // prevent page from reloading
    e.preventDefault();

    if(!this.props.isPlaying) {
      this.props.playFrequency(this.props.note, true);
    }
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

    if(this.props.isPlaying) {
      this.props.playFrequency(this.props.note, false);
    }
  },    // handleMouseUp

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    var renderButtonClass = () => {
      return "keyboard-unpressed";
      // if(this.props.isPlaying) {
      //   return "button";
      // }
      // return "hollow button";
    };

    return (
      <button className={renderButtonClass()}
        onMouseDown={() => {this.handleButtonDown(value)}}
        onMouseUp={this.handleButtonUp}></button>
    );        // return for render function
  }           // render function
});           // FormKeyboardButton class

// export FormKeyboardButton for other modules to use
module.exports = FormKeyboardButton;
