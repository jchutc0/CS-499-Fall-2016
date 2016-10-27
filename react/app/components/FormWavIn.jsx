/*****
FormWavIn Class

The purpose of this class is to get audio data in from the microphone and
return it to the calling program in a helpful way. It is not currenly
implemented.
*****/

// Require the React framework
var React = require('react');

// create the FormWavIn class
var FormWavIn = React.createClass({

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <p>
          This form will request a wav file and play it
        </p>
      </div>
    );    // return value
  }       // render function
});       // FormWavIn class

// export FormWavIn for other modules to use
module.exports = FormWavIn;
