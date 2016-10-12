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
    // var frequency1 = this.refs.frequency1.value;
    // var frequency2 = this.refs.frequency2.value;
    // if(frequency1 != '') {
    //   console.log('Frequency1 is: ' + frequency1);
    // }
    // if (frequency2 != '') {
    //   console.log('Frequency2 is: ' + frequency2);
    // }
    var frequencyObject = {
      frequency1: this.refs.frequency1.value,
      frequency2: this.refs.frequency2.value
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
