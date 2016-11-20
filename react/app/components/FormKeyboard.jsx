/*****
FormKeyboard Class

The purpose of this class is to
*****/

// Require the React framework
var React = require('react');

var FormButton = require('FormButton');

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
  handleButton: function(buttonID, isPlaying) {
    var frequencyArray = {
      '0' : 523.25,   // C
      '1' : 493.88,   // B
      '2' : 466.16,   // Bb
      '3' : 440.00,   // A
      '4' : 415.30,   // Ab
      '5' : 392.00,   // G
      '6' : 369.99,   // F#
      '7' : 349.23,   // F
      '8' : 329.63,   // E
      '9' : 311.13,   // Eb
      '10' : 293.66,   // D
      '11' : 277.18,   // C#
      '12' : 261.63,   // C
      '13' : 246.94,   // B
      '14' : 233.08,   // Bb
      '15' : 220.00,   // A
      '16' : 207.65,   // Ab
      '17' : 196.00,   // G
      '18' : 185.00,   // F#
      '19' : 174.61,   // F
      '20' : 164.81,   // E
      '21' : 155.56,   // Eb
      '22' : 146.83,   // D
      '23' : 138.59,   // C#
      '24' : 130.81    // C
    };

    if(isPlaying) {
      if (frequencyArray[buttonID] !== undefined) {
        return this.props.playFrequency([frequencyArray[buttonID]], [8]);
      }
    }
    else {
      return this.props.playFrequency([], []);
    }
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
        <FormButton buttonID={value}
          downClass={"keyboard-pressed"}
          upClass={"keyboard-unpressed"}
          callback={this.handleButton}
          />
      );
    };

    return (
      <div>
        <div className="keyboard-white">{renderButton('0')}</div>
        <div className="keyboard-white">{renderButton('1')}
          <div className="keyboard-black">{renderButton('2')}</div>
        </div>
        <div className="keyboard-white">{renderButton('3')}
          <div className="keyboard-black">{renderButton('4')}</div>
        </div>
        <div className="keyboard-white">{renderButton('5')}
          <div className="keyboard-black">{renderButton('6')}</div>
        </div>
        <div className="keyboard-white">{renderButton('7')}</div>
        <div className="keyboard-white">{renderButton('8')}
          <div className="keyboard-black">{renderButton('9')}</div>
        </div>
        <div className="keyboard-white">{renderButton('10')}
          <div className="keyboard-black">{renderButton('11')}</div>
        </div>
        <div className="keyboard-white">{renderButton('12')}</div>
        <div className="keyboard-white">{renderButton('13')}
          <div className="keyboard-black">{renderButton('14')}</div>
        </div>
        <div className="keyboard-white">{renderButton('15')}
          <div className="keyboard-black">{renderButton('16')}</div>
        </div>
        <div className="keyboard-white">{renderButton('17')}
          <div className="keyboard-black">{renderButton('18')}</div>
        </div>
        <div className="keyboard-white">{renderButton('19')}</div>
        <div className="keyboard-white">{renderButton('20')}
          <div className="keyboard-black">{renderButton('21')}</div>
        </div>
        <div className="keyboard-white">{renderButton('22')}
          <div className="keyboard-black">{renderButton('23')}</div>
        </div>
        <div className="keyboard-white">{renderButton('24')}</div>

      </div>
    );    // return value
  }       // render function
});       // FormKeyboard class

// export FormKeyboard for other modules to use
module.exports = FormKeyboard;
