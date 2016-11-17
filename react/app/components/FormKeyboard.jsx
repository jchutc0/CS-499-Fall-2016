/*****
FormKeyboard Class

The purpose of this class is to
*****/

// Require the React framework
var React = require('react');

// create the FormKeyboard class
var FormKeyboard = React.createClass({

  // require the handlePlayFrequency function to pass frequency information
  //   back through Forms
  propTypes: {
    playFrequency: React.PropTypes.func.isRequired
  },		// propTypes

  /*
  handleButtonDown function

  taken as a call from a button press - plays a defined frequency
  */
  handleButtonDown: function(buttonID) {
    var frequencyArray = [
      523.25,   // C
      493.88,   // B
      466.16,   // Bb
      440.00,   // A
      415.30,   // Ab
      392.00,   // G
      369.99,   // F#
      349.23,   // F
      329.63,   // E
      311.13,   // Eb
      293.66,   // D
      277.18,   // C#
      261.63,   // C
      246.94,   // B
      233.08,   // Bb
      220.00,   // A
      207.65,   // Ab
      196.00,   // G
      185.00,   // F#
      174.61,   // F
      164.81,   // E
      155.56,   // Eb
      146.83,   // D
      138.59,   // C#
      130.81    // C
    ];
    var button = parseInt(buttonID);

    if((button < 0)  || (button >= frequencyArray.size)) {
      button = 0;
    }
    return this.props.playFrequency([frequencyArray[button]], [8]);
  },

  /*
  handleButtonUp function

  taken as a call from a button release - stops playing
  */
  handleButtonUp: function() {
    return this.props.playFrequency([], []);
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    // renderButton renders one of the buttons
    var renderButton = (value) => {
      return (
        <button className='keyboard-white'
          onMouseDown={() => {this.handleButtonDown(value)}}
          onMouseUp={this.handleButtonUp}></button>
      );
    };

    return (
      <div>
        <div className="keyboard-white">{renderButton(0)}</div>
        <div className="keyboard-white">{renderButton(1)}
          <div className="keyboard-black">{renderButton(2)}</div>
        </div>
        <div className="keyboard-white">{renderButton(3)}
          <div className="keyboard-black">{renderButton(4)}</div>
        </div>
        <div className="keyboard-white">{renderButton(5)}
          <div className="keyboard-black">{renderButton(6)}</div>
        </div>
        <div className="keyboard-white">{renderButton(7)}</div>
        <div className="keyboard-white">{renderButton(8)}
          <div className="keyboard-black">{renderButton(9)}</div>
        </div>
        <div className="keyboard-white">{renderButton(10)}
          <div className="keyboard-black">{renderButton(11)}</div>
        </div>
        <div className="keyboard-white">{renderButton(12)}</div>
        <div className="keyboard-white">{renderButton(13)}
          <div className="keyboard-black">{renderButton(14)}</div>
        </div>
        <div className="keyboard-white">{renderButton(15)}
          <div className="keyboard-black">{renderButton(16)}</div>
        </div>
        <div className="keyboard-white">{renderButton(17)}
          <div className="keyboard-black">{renderButton(18)}</div>
        </div>
        <div className="keyboard-white">{renderButton(19)}</div>
        <div className="keyboard-white">{renderButton(20)}
          <div className="keyboard-black">{renderButton(21)}</div>
        </div>
        <div className="keyboard-white">{renderButton(22)}
          <div className="keyboard-black">{renderButton(23)}</div>
        </div>
        <div className="keyboard-white">{renderButton(24)}</div>

      </div>
    );    // return value
  }       // render function
});       // FormKeyboard class

// export FormKeyboard for other modules to use
module.exports = FormKeyboard;
