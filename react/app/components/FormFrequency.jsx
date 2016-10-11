var React = require('react');

var FormFrequency = React.createClass({
  onButtonClick: function(e) {
    e.preventDefault();

    var name = this.refs.name.value;
    this.setState({
      name: name});
    this.refs.name.value = '';

    // alert(name);
  },

  getDefaultProps: function() {
    return {
      name: 'React'
    };
  },

  getInitialState: function() {
    return {
      name: this.props.name
    };
  },

  render: function() {
    var name = this.state.name;
    return (
      <div>
        <p>
          Rendered FormFrequency <br/>
          Name: {name}
        </p>
        <form onSubmit={this.onButtonClick}>
          <input type="text" ref="name"/>
          <button>Set name</button>
        </form>
      </div>
    );
  }
});

module.exports = FormFrequency;
