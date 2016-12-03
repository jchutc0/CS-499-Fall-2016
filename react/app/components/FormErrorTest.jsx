/*****
FormErrorTest Class

The purpose of this class is to test the ErrorModal
*****/

// Require the React framework
var React = require('react');

// Require the ErrorModal
var ErrorModal = require('ErrorModal');
var FormFrequencyTone = require('FormFrequencyTone');

// create the FormErrorTest class
var FormErrorTest = React.createClass({

  /*
  getInitialState function

  Sets the initial state
  */
  getInitialState: function() {
    return ({
      isPlaying: {
        a: true,
        b: false
      }
    });     // return value
  },        // getInitialState function

  poop: function() {
    console.log('got here.');
  },

  setError: function(errorMessage) {
    this.setState({
      error: errorMessage

    });     // setState
  },        // setError

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        Rendered FormErrorTest
        <ErrorModal error={this.state.error} clearError={this.setError}/>
        <FormFrequencyTone toneID='Blag' updateTone={this.poop}/>
      </div>
    );    // return value
  }       // render function
});       // FormErrorTest class

// export FormErrorTest for other modules to use
module.exports = FormErrorTest;
