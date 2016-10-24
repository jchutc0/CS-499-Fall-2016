// Require the React framework
var React = require('react');

var NotesToUser = React.createClass({

  getDefaultProps: function() {
    return {
      message: 'This is the default message.'
    };
  },

  render: function() {
    return (
      <div>
        <p>Rendered NotesToUser</p>
        <div>{this.props.message}</div>
      </div>
    );
  }
});


module.exports = NotesToUser;
