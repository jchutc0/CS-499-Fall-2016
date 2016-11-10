/*****
FormKeyboard Class

The purpose of this class is to
*****/

// Require the React framework
var React = require('react');

// create the FormKeyboard class
var FormKeyboard = React.createClass({

  /*
  handleButtonDown function

  taken as a call from a button press - plays a defined frequency
  */
  handleButtonDown: function(buttonID) {
    console.log('Button Pressed' + buttonID);
  },

  /*
  handleButtonUp function

  taken as a call from a button release - stops playing
  */
  handleButtonUp: function() {
    console.log('Button Released');
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
              onMouseDown={() => {this.handleButtonDown(1)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(2)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(3)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(4)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(5)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(6)}}
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
              onMouseDown={() => {this.handleButtonDown(8)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(9)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(10)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(11)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(12)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(13)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(14)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(15)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(16)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(17)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(18)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(19)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(20)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(21)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(22)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <div className="keyboard-black">
            <button className='keyboard-white'
              onMouseDown={() => {this.handleButtonDown(23)}}
              onMouseUp={this.handleButtonUp}></button>
          </div>
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(24)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
        <div className="keyboard-white">
          <button className='keyboard-white'
            onMouseDown={() => {this.handleButtonDown(25)}}
            onMouseUp={this.handleButtonUp}></button>
        </div>
      </div>
    );    // return value
  }       // render function
});       // FormKeyboard class

// export FormKeyboard for other modules to use
module.exports = FormKeyboard;
