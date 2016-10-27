/*****
FormMicrophone Class

The purpose of this class is
*****/

// Require the React framework
var React = require('react');

// create the FormMicrophone class
var FormMicrophone = React.createClass({

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <p>
          This class will read in data from the microphone.
        </p>
      </div>
    );    // return value
  }       // render function
});       // FormMicrophone class

// export FormMicrophone for other modules to use
module.exports = FormMicrophone;
