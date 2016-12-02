/*****
FormWhiteNoise class

The purpose of this class is to display the form for the white noise class
*****/

// Require the React framework
var React = require('react');

// Create the NotesToUser class
var NotesToUser = React.createClass({

  /*
  getDefaultProps function

  Sets default message property -- changed if the calling component passes
  another prop
  */
  getDefaultProps: function() {
    return {
      message: 'This is the default message.'
    };        // default props object
  },          // getDefaultProps function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <div>{this.props.message}</div>
      </div>
    );        // return value
  }           // render function
});           // NotesToUser class

// export NotesToUser for other modules to use
module.exports = NotesToUser;
