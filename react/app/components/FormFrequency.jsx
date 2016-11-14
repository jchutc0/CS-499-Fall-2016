/*****
FormFrequency class

The purpose of this class is to take input from the user about one or two
tones and send those tones back to the calling class through the required
playFrequency function
*****/

// Require the React framework
var React = require('react');

// create the FormFrequency class
var FormFrequency = React.createClass({
  // require the playFrequency function as a passed property
  propTypes: {
    playFrequency: React.PropTypes.func.isRequired
  },      // propTypes object


  /*
  getInitialState function

  Sets the initial playing state to false
  */
  getInitialState: function() {
    return {
      playing: false
    };      // return value
  },        // getInitialState function

  /*
  playUserFrequency function

  Takes the values from the form and sends them back to the calling class
  through the required playFrequency prop and updates the playing state

  Takes: e event handler (this function is meant to be called from a button
  press)

  Requires: this.props.playFrequency passed (required for the class),
  form values (refs) for frequency1, gain1, frequency2, gain2
  */
  playUserFrequency: function(e) {
    // prevent a full page reload
    e.preventDefault();

    var frequency1 = this.refs.frequency1.value;
    var frequency2 = this.refs.frequency2.value;
    var gain1 = this.refs.gain1.value;
    var gain2 = this.refs.gain2.value;

    var frequencyArray = new Array();
    var gainArray = new Array();

    //
    //
    // // set up frequencyObj to send back to calling component
    // var frequencyObject = {
    //   frequency1: this.refs.frequency1.value,
    //   gain1: this.refs.gain1.value,
    //   frequency2: this.refs.frequency2.value,
    //   gain2: this.refs.gain2.value
    // };    // frequencyObject

    if(this.testFrequencyAndGain(frequency1, gain1)) {
      frequencyArray.push(Number(frequency1));
      gainArray.push(Number(gain1));
    }

    if(this.testFrequencyAndGain(frequency2, gain2)) {
      frequencyArray.push(Number(frequency2));
      gainArray.push(Number(gain2));
    }

    if(frequencyArray.length > 0) {
      this.setState({
        playing: true
      });

      return this.props.playFrequency(frequencyArray, gainArray);
    } else {
      return this.stopUserFrequency(e);
    }



    // if(
    //   (
    //     (frequencyObject.frequency1 > 0) &&
    //     (frequencyObject.gain1 > 0)
    //   ) ||
    //   (
    //     (frequencyObject.frequency2 > 0) &&
    //     (frequencyObject.gain2 > 0)
    //   )
    // ) {
    //   // set playing state true
    //   this.setState({
    //     playing: true
    //   });
    //
    //   // send frequencyObject back to calling component
    //   this.props.playFrequency(frequencyObject);
    // } else {
    //   alert('Please enter a valid frequency');
    // }

  },      // playUserFrequency function

  testFrequencyAndGain: function(frequency, gain) {
    return (
      (frequency > 0) &&
      (gain > 0)
    );
  },

  /*
  stopUserFrequency function

  Calls the required playFrequency prop with 0 values for both tones to stop
  the tone generation. Sets the playing state to false.

  Takes: e event handler (this function is meant to be called from a button
  press)

  Requires: this.props.playFrequency passed (required for the class)
  */
  stopUserFrequency: function(e) {
    // prevent a full page reload
    e.preventDefault();

    // set playing state false
    this.setState({
      playing: false
    });

    // send blank frequencyObject back to calling component
    this.props.playFrequency([], []);
  },        // stopUserFrequency function

  /*
  clearForm function

  Clears the frequency and gain values from the form so the user doesn't have
  to

  Takes: e event handler (this function is meant to be called from a button
  press)

  Requires: form values (refs) for frequency1, gain1, frequency2, gain2
  */
  clearForm: function(e) {
    // prevent a full page reload
    e.preventDefault();

    // if a tone is currently playing, stop it
    this.stopUserFrequency(e);

    // set all refs to an empty string
    this.refs.frequency1.value = '';
    this.refs.gain1.value = '';
    this.refs.frequency2.value = '';
    this.refs.gain2.value = '';
  },      // clearForm function

  /*
  renderPlayFrequencyButton function

  Renders the button for the user to play or stop the frequency. If no tone
  is playing, the button should display 'Play Frequency' and if a tone is
  playing, the button should display 'Stop Frequency'
  */
  renderPlayFrequencyButton: function() {
    // check if this.state.playing is set
    if(this.state.playing) {
      // return stop button
      return (
        <div className='row'>
          <div className='columns small-12 medium-6'>
            <button type='button' className='expanded button' ref='stopSound'
              onClick={this.stopUserFrequency}>Stop Frequency</button>
          </div>
          <div className='columns small-12 medium-6'>
            <button  type='button'className='expanded button' ref='startSound'
              onClick={this.playUserFrequency}>Update Frequency</button>
          </div>
        </div>
      );
    } else {
      // return play button
      return (
        <div className='row'>
          <div className='columns small-12 medium-6'>
            <button type='button' className='expanded button' ref='startSound'
              onClick={this.playUserFrequency}>Play Frequency</button>
          </div>
          <div className='columns small-12 medium-6'>
            <button type='button' className='expanded button' ref='clearForm'
              onClick={this.clearForm}>Clear Form</button><br/>
          </div>
        </div>
      );      // return
    }         // else case (this.state.playing is not true)
  },          // renderPlayFrequencyButton function

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <form ref='frequency-form'>
          <fieldset className="frequency-fieldset">
            <legend>Tone 1</legend>
            <div className="row">
              <div className="columns small-12 medium-6">
                <label htmlFor='frequency1'>Frequency:</label>
                <input type='number' ref='frequency1' name='frequency1'
                  id='frequency1' maxLength="5" />
              </div>
              <div className="columns small-12 medium-6">
                <label htmlFor='gain1' >Gain:</label>
                <input type='number' ref='gain1' name='gain1'
                  id='gain1' maxLength="5" defaultValue="10" />
              </div>
            </div>
          </fieldset>
          <fieldset className="frequency-fieldset">
            <legend>Tone 2</legend>
              <div className="row">
                <div className="columns small-12 medium-6">
                  <label htmlFor='frequency2'>Frequency:</label>
                  <input type='number' ref='frequency2' name='frequency2'
                    id='frequency2' maxLength="5" />
                </div>
                <div className="columns small-12 medium-6">
                  <label htmlFor='gain2' >Gain:</label>
                  <input type='number' ref='gain2' name='gain2' id='gain2'
                    maxLength="5" defaultValue="10"/>
                </div>
            </div>
          </fieldset>
          {this.renderPlayFrequencyButton()}
        </form>
      </div>
    );      // return value
  }         // render function
});         // FormFrequency class

// export FormFrequency for other modules to use
module.exports = FormFrequency;
