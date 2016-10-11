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
        <p>{this.props.message}</p>
      </div>
    );
  }
});


module.exports = NotesToUser;
