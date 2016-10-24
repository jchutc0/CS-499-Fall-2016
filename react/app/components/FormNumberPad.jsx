// Require the React framework
var React = require('react');

var FormNumberPad = React.createClass({

  propTypes: {
    playTelephony: React.PropTypes.func.isRequired,
    stopSound: React.PropTypes.func.isRequired
  },

  componentWillMount: function() {
    window.addEventListener('keydown', this.handleKeypress);
    window.addEventListener('keyup', this.handleKeyRelease);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.handleKeypress);
    window.removeEventListener('keyup', this.handleKeyRelease);
  },

  handleKeypress: function(key) {
    switch (key.keyCode) {
  case (49):
      // console.log('1');
      this.playTelephony(0);
      break;
  case (50):
      // console.log('2');
      this.playTelephony(1);
      break;
  case (51):
      // console.log('3');
      this.playTelephony(2);
      break;
  case (52):
      // console.log('4');
      this.playTelephony(3);
      break;
  case (53):
      // console.log('5');
      this.playTelephony(4);
      break;
  case (54):
      // console.log('6');
      this.playTelephony(5);
      break;
  case (55):
      // console.log('7');
      this.playTelephony(6);
      break;
  case (56):
      // console.log('8');
      this.playTelephony(7);
      break;
  case (57):
      // console.log('9');
      this.playTelephony(8);
      break;
  case (48):
      // console.log('0');
      this.playTelephony(10);
      break;
      // 49 - 57 1 - 9; 48 = 0

    };
  },

  handleKeyRelease: function(key) {
    if((key.keyCode > 47) && key.keyCode < 58) {
      return this.stopSound();
    }
  },

  playTelephony: function(numPressed) {
    return this.props.playTelephony(numPressed);
  },

  stopSound: function() {
    return this.props.stopSound();
  },

  render: function() {
    return (
      <div>
        <fieldset>
          <legend>Telephony</legend>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(0)}} onMouseUp={() => {this.stopSound()} }>1</button>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(1)}} onMouseUp={() => {this.stopSound()} }>2</button>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(2)}} onMouseUp={() => {this.stopSound()} }>3</button>
          <br/>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(3)}} onMouseUp={() => {this.stopSound()} }>4</button>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(4)}} onMouseUp={() => {this.stopSound()} }>5</button>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(5)}} onMouseUp={() => {this.stopSound()} }>6</button>
          <br/>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(6)}} onMouseUp={() => {this.stopSound()} }>7</button>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(7)}} onMouseUp={() => {this.stopSound()} }>8</button>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(8)}} onMouseUp={() => {this.stopSound()} }>9</button>
          <br/>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(9)}} onMouseUp={() => {this.stopSound()} }>*</button>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(10)}} onMouseUp={() => {this.stopSound()} }>0</button>
          <button className="hollow button" onMouseDown={() => {this.playTelephony(11)}} onMouseUp={() => {this.stopSound()} }>#</button>
          <br/>
        </fieldset>
      </div>
    );
  }
});

module.exports = FormNumberPad;
