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
    keyCode         : React.PropTypes.string
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
      this.props.playFrequency(this.props.buttonLabel, true);
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
      this.props.playFrequency(this.props.buttonLabel, false);
    }
  },    // handleMouseUp

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    var renderButtonClass = () => {
      if(this.props.isPlaying) {
        return "button";
      }
      return "hollow button";
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
