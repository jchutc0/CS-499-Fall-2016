/*****
FormErrorTest Class

The purpose of this class is to test the ErrorModal
*****/

// Require the React framework
var React = require('react');

// Require the ErrorModal
var ErrorModal = require('ErrorModal');
var FormNumberPadButton = require('FormNumberPadButton');

// create the FormErrorTest class
var FormErrorTest = React.createClass({

  setError: function(errorMessage) {
    this.setState({
      error: errorMessage
    });     // setState
  },        // setError

  playFrequency: function(label, playing) {
    console.log('playFrequency: '+ label + ' : ' + playing);
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        Rendered FormErrorTest
        <ErrorModal clearError={this.setError}/>
        <FormNumberPadButton playFrequency={this.playFrequency}
          buttonLabel={"a"} isPlaying={true} />
        <FormNumberPadButton playFrequency={this.playFrequency}
          buttonLabel={"b"} isPlaying={false} />
      </div>
    );    // return value
  }       // render function
});       // FormErrorTest class

// export FormErrorTest for other modules to use
module.exports = FormErrorTest;
