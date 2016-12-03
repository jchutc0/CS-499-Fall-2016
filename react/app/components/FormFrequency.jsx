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

  // toneIDs: a class constant to map the toneID from FormFrequencyTone to
  //  the value in the frequency and gain arrays
  toneIDs: {
    'Tone 1': 0,
    'Tone 2': 1
  },

  /*
  getInitialState function

  Sets the initial tone arrays in the state to 0
  */
  getInitialState: function() {
    return {
      frequencyArray: [0, 0],
      gainArray: [0, 0]
    };      // return value
  },        // getInitialState function

  /*
  handleFormFrequencyTone function

  invoked from the FormFrequencyTone module
  sets the gain and frequency state arrays to add or remove the tone from the
  FormFrequencyTone module and plays the new tone(s) with the playFrequency
  prop.
  */
  handleFormFrequencyTone: function(toneID, frequency, gain) {
    // the array offset for the frequency and gain arrays for the tone
    //  specified by toneID
    var toneElement = this.toneIDs[toneID];

    // check to make sure toneElement is valid to avoid weird memory access
    if(toneElement === undefined) {
      return;
    }     // if toneElement is not undefined

    // pull the current frequency and gain arrays from the state
    var {frequencyArray, gainArray} = this.state;
    // put the frequency and gain values in the array
    frequencyArray[toneElement] = frequency;
    gainArray[toneElement] = gain;

    // update the arrays in the state
    this.setState({
      frequencyArray: frequencyArray,
      gainArray: gainArray
    });   // setState

    // if the array is all 0's, stop playing tones
    //  otherwise, play audio with the new frequency and gain arrays
    if((gainArray.toString() === '0,0')) {
      this.props.playFrequency();
    } else {
      this.props.playFrequency(frequencyArray, gainArray);
    }           // if all 0's
  },            // handleFormFrequencyTone function

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
