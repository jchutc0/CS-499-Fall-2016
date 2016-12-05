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

  keycodes: {
    'q' : 81,
      '2' : 50,
    'w' : 87,
      '3' : 51,
    'e' : 69,
    'r' : 82,
      '5' : 53,
    't' : 84,
      '6' : 54,
    'y' : 89,
      '7' : 55,
    'u' : 85,
    'i' : 73,
    'z' : 90,
      's' : 83,
    'x' : 88,
      'd' : 68,
    'c' : 67,
    'v' : 86,
      'g' : 71,
    'b' : 66,
      'h' : 72,
    'n' : 78,
      'j' : 74,
    'm' : 77
  },

  frequencyArray: {
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
  },

  maxTones: 4,

  getInitialState: function() {
    return {
      playing: {},
      gain: 5
    };
  },

  /*
  handleButtonDown function

  taken as a call from a button press - plays a defined frequency
  */
  handleButton: function(buttonID, isPlaying) {
    var {playing} = this.state;

    if(isPlaying) {
      if (this.frequencyArray[buttonID] !== undefined) {
        playing[buttonID] = true;
        // if(playingKeys.length > this.maxTones) {
        //   delete(playing[playingKeys[0]]);
        //   playingKeys = Object.keys(playing);
        // }
        this.setState({
          playing: playing
        });
        var playingKeys = Object.keys(playing);
        var arraySize = playingKeys.length;
        var frequencyArray = new Array(arraySize);
        var gainArray = new Array(arraySize);
        for(var i = 0; i < arraySize; i++) {
          frequencyArray[i] = this.frequencyArray[playingKeys[i]];
          gainArray[i] = this.state.gain;
        }
        return this.props.playFrequency(frequencyArray, gainArray);
      }
    }
    else {
      delete(playing[buttonID]);
      this.setState({
        playing: playing
      });
      var playingKeys = Object.keys(playing);
      var arraySize = playingKeys.length;
      var frequencyArray = new Array(arraySize);
      var gainArray = new Array(arraySize);
      for(var i = 0; i < arraySize; i++) {
        frequencyArray[i] = this.frequencyArray[playingKeys[i]];
        gainArray[i] = this.state.gain;
      }
      return this.props.playFrequency(frequencyArray, gainArray);
    }
  },

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
    // renderButton renders one of the buttons
    var renderButton = (value, key) => {
      return (
        <FormButton buttonID={value}
          downClass={'pressed'}
          upClass={'unpressed'}
          callback={this.handleButton}
          keyCode={this.keycodes[key]}
          buttonLabel={key}/>
      );
    };

    return (
      <div className='formKeybord'>
        <div className='keyboard-form'>
          <div className='whiteKey'>{renderButton('24', 'z')}
            <div className='blackKey'>{renderButton('23', 's')}</div>
          </div>
          <div className='whiteKey'>{renderButton('22', 'x')}
            <div className='blackKey'>{renderButton('21', 'd')}</div>
          </div>
          <div className='whiteKey'>{renderButton('20', 'c')}</div>
          <div className='whiteKey'>{renderButton('19', 'v')}
            <div className='blackKey'>{renderButton('18', 'g')}</div>
          </div>
          <div className='whiteKey'>{renderButton('17', 'b')}
            <div className='blackKey'>{renderButton('16', 'h')}</div>
          </div>
          <div className='whiteKey'>{renderButton('15', 'n')}
            <div className='blackKey'>{renderButton('14', 'j')}</div>
          </div>
          <div className='whiteKey'>{renderButton('13', 'm')}</div>

          <div className='whiteKey'>{renderButton('12', 'q')}
            <div className='blackKey'>{renderButton('11', '2')}</div>
          </div>
          <div className='whiteKey'>{renderButton('10', 'w')}
            <div className='blackKey'>{renderButton('9', '3')}</div>
          </div>
          <div className='whiteKey'>{renderButton('8', 'e')}</div>
          <div className='whiteKey'>{renderButton('7', 'r')}
            <div className='blackKey'>{renderButton('6', '5')}</div>
          </div>
          <div className='whiteKey'>{renderButton('5', 't')}
            <div className='blackKey'>{renderButton('4', '6')}</div>
          </div>
          <div className='whiteKey'>{renderButton('3', 'y')}
            <div className='blackKey'>{renderButton('2', '7')}</div>
          </div>
          <div className='whiteKey'>{renderButton('1', 'u')}</div>
          <div className='whiteKey'>{renderButton('0', 'i')}</div>
        </div>
        <div>
          <label htmlFor='gainSlider'>Volume:</label>
          <input type='range' className='slider'
            name='gainSlider' ref='gainSlider'
            min='0' max='10'
            defaultValue='5'
            onChange={this.handleGainSliderChange}/>
        </div>
      </div>
    );    // return value
  }       // render function
});       // FormKeyboard class

// export FormKeyboard for other modules to use
module.exports = FormKeyboard;
