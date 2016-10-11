var React = require('react');

var FormNumberPad = React.createClass({

  propTypes: {
    playTelephony: React.PropTypes.func.isRequired,
    stopSound: React.PropTypes.func.isRequired
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
