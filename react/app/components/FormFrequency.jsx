/*****
FormFrequency class

The purpose of this class is to take input from the user about one or two
tones and send those tones back to the calling class through the required
playFrequency function
*****/

// Require the React framework
var React = require('react');

// Require other modules
var FormFrequencyTone = require('FormFrequencyTone');

// create the FormFrequency class
var FormFrequency = React.createClass({
  // require the playFrequency function as a passed property
  propTypes: {
    playFrequency: React.PropTypes.func.isRequired
  },      // propTypes object

  toneIDs: {
    'Tone 1': 0,
    'Tone 2': 1
  },

  /*
  getInitialState function

  Sets the initial playing state to false
  */
  getInitialState: function() {
    return {
      playing: false,
      frequencyArray: [],
      gainArray: []
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

    if(gain1 < 0) {
      gain1 = 0;
      this.refs.gain1.value = '0';
    }

    if(gain1 > 10) {
      gain1 = 10;
      this.refs.gain1.value = '10';
    }

    if(gain2 < 0) {
      gain2 = 0;
      this.refs.gain2.value = '0';
    }

    if(gain2 > 10) {
      gain2 = 10;
      this.refs.gain2.value = '10';
    }

    if(frequency1 < 20){
      frequency1 = 20;
      this.refs.frequency1.value = '20';
    }

    if(frequency1 > 20000){
      frequency1 = 20000;
      this.refs.frequency1.value = '20000';
    }

    if(frequency2 < 20){
      frequency2 = 20;
      this.refs.frequency2.value = '20';
    }

    if(frequency2 > 20000){
      frequency2 = 20000;
      this.refs.frequency2.value = '20000';
    }

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
    this.refs.frequency1.value = '440';
    this.refs.gain1.value = '10';
    this.refs.frequency2.value = '350';
    this.refs.gain2.value = '10';
  },      // clearForm function


  handleFormFrequencyTone: function(playing, toneID, frequency, gain) {
    var toneElement = this.toneIDs[toneID];

    if(toneElement === undefined) {
      return;
    }

    var {frequencyArray, gainArray} = this.state;
    if(playing) {
      frequencyArray[toneElement] = frequency;
      gainArray[toneElement] = gain;
    } else {
      frequencyArray[toneElement] = 0;
      gainArray[toneElement] = 0;
    }
    this.setState({
      frequencyArray: frequencyArray,
      gainArray: gainArray
    });
    var crap = [];
    var gainString = gainArray.toString();
    if(
      (gainString === '0,0') ||
      (gainString === '0') ||
      (gainString === '')
    ) {
      this.props.playFrequency();
    } else {
      this.props.playFrequency(frequencyArray, gainArray);
    }
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div className='frequency-form'>
        <div className='row'>
          <div className="columns small-12 medium-6">
            <FormFrequencyTone toneID='Tone 1'
              updateTone={this.handleFormFrequencyTone}
              defaultTone={440}/>
          </div>
          <div className="columns small-12 medium-6">
            <FormFrequencyTone toneID='Tone 2'
              updateTone={this.handleFormFrequencyTone}
              defaultTone={350}/>
          </div>
        </div>
      </div>
    );      // return value
  }         // render function
});         // FormFrequency class

// export FormFrequency for other modules to use
module.exports = FormFrequency;
