/*****
AudioIn Class

The purpose of this class is to get audio data in from the microphone and
return it to the calling program in a helpful way. It is not currenly
implemented.
*****/

// Require the React framework
var React = require('react');

// create the AudioIn class
var AudioIn = React.createClass({

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>

      </div>
    );    // return value
  }       // render function
});       // AudioIn class

// export AudioIn for other modules to use
module.exports = AudioIn;
