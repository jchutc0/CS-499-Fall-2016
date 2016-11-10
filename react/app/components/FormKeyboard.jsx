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
    console.log('Button Pressed' + buttonID);
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
    return this.props.playFrequency({
      frequency1: frequencyArray[button],
      gain1: 10
    });
  },

  /*
  handleButtonUp function

  taken as a call from a button release - stops playing
  */
  handleButtonUp: function() {
    console.log('Button Released');
    return this.props.playFrequency({
      frequency1: 0,
      gain1: 0
    });

  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <div className="keyboard-white">
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(0)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(2)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(1)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(4)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(3)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(6)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(5)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(7)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(9)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(8)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(11)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(10)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(12)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(14)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(13)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(16)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(15)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(18)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(17)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(19)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(21)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(20)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(23)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(22)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(24)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
      </div>
    );    // return value
  }       // render function
});       // FormKeyboard class

// export FormKeyboard for other modules to use
module.exports = FormKeyboard;
