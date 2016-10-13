var React = require('react');

var FormFrequency = React.createClass({
  propTypes: {
    playFrequency: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      play: 0
    };
  },

  toggleUserFrequency: function(e) {
    e.preventDefault();
    var frequencyObject = {
      frequency1: this.refs.frequency1.value,
      gain1: 0.1,
      frequency2: this.refs.frequency2.value,
      gain2: 0.1
    };
    this.props.playFrequency(frequencyObject);
  },

  render: function() {
    return (
      <div>
        <fieldset>
        <legend>Sound Info</legend>
        <label htmlFor='frequency1' >Frequency 1:</label>
        <input type='number' ref='frequency1' name='frequency1' id='frequency1' maxLength="5" />
        <label htmlFor='frequency2' >Frequency 2:</label>
        <input type='number' ref='frequency2' name='frequency2' id='frequency2' maxLength="5" />
        <button className='button' id='toggleSound' onClick={this.toggleUserFrequency}>Play Frequency</button><br/>
        <br/>
        </fieldset>
      </div>
    );
  }
});

module.exports = FormFrequency;
