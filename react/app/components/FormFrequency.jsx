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
        <fieldset>
        <legend>Sound Info</legend>
        <label htmlFor='frequency1' >Frequency 1:</label>
        <input type='number' name='frequency1' id='frequency1' maxLength="5" />
        <label htmlFor='frequency2' >Frequency 2:</label>
        <input type='number' name='frequency2' id='frequency2' maxLength="5" />
        <button id='toggleSound' onclick='toggleUserFrequency()'>Play Frequency</button><br/>
        <br/>
        </fieldset>
      </div>
    );
  }
});

module.exports = FormFrequency;
