/*****
AudioOut Class

The purpose of this class is to make decisions about which other audio
classes to render
*****/

// require the React framework
var React = require('react');

// require AudioOut subclasses to render
var AudioOutTone = require('AudioOutTone');
var AudioOutWhiteNoise = require('AudioOutWhiteNoise');

// create the AudioOut class
var AudioOut = React.createClass({

  /*
  define the expected properties
    - analyser: produces the data for the graphs from the output (required)
    - context: the audio context that allows sounds to play (required)
    - frequencyArray: an array of frequencies to play
    - gainArray: an array of gain values for the frequencies
    - whiteNoise: the max gain value for the white noise generator
  */
  propTypes: {
    analyser        : React.PropTypes.object.isRequired,
    context         : React.PropTypes.object.isRequired,
    frequencyArray  : React.PropTypes.array,
    gainArray       : React.PropTypes.array,
    whiteNoise      : React.PropTypes.number
  },  // propTypes

  /*
  getDefaultProps function
  called on component render

  sets default component properties in the event the calling function did not
  pass them -- an empty frequency or gain array will not play a tone
  */
  getDefaultProps: function() {
    return {
      frequencyArray: [],
      gainArray: [],
      whiteNoise: undefined
    };    // return value
  },      // getDefaultProps function

  /*
  getInitialState function
  called on component render

  sets default values for the compent state
  also sets up the master program gain control and mutes it
  */
  getInitialState: function() {
    var {context, analyser} = this.props;
    var gain = context.createGain();
    gain.gain.value = 0;
    gain.connect(analyser);
    return({
      gain: gain,
      muted: true
    });     // state return
  },        // getInitialState

  /*
  componentWillReceiveProps function
  called when component props are changing
  takes: nextProps - props to be used for the next render

  sets the muted state depending on whether a sound should play with the new
  props and sets the gain to 0 or 1 if it will or will not be muted
  */
  componentWillReceiveProps: function(nextProps) {
    var {
      frequencyArray, gainArray, whiteNoise, soundMute
    } = nextProps;

    // set muted based on whether a sound should play
    var muted = Boolean(
      (frequencyArray.length !== gainArray.length) ||
      ((frequencyArray.length < 1) && (whiteNoise === undefined))
    );

    // set muted in the state if it changes
    if(muted !== this.state.muted) {
      this.setState({
        muted: muted
      });

      // set the gain value if muted has changed
      if(muted) {
        this.state.gain.gain.value = 0;
      } else {
        this.state.gain.gain.value = 1;
      }

      // tell Main the sound is muted for the graphs
      soundMute(muted);
    }     // if muted has changed
  },      // componentWillReceiveProps

  /*
  render function
  called when the component is rendered

  renders the component to the web browser -- the default entry point
  conditionally renders the AudioOutWhiteNoise or AudioOutTone components as
  required
  */
  render: function() {

    var {
      frequencyArray, gainArray, whiteNoise, context
    } = this.props;
    var muted = this.state.muted;

    /*
    renderAudioOut function

    determines whether to render nothing (no audio), the AudioOutWhiteNoise
    module (for white noise), or 1 or more AudioOutTone components
    */
    var renderAudioOut = () => {

      // if the component is muted, render no audio
      if(muted) {
        return;
      }

      // if props.whitenoise is set, render the AudioOutWhiteNoise module
      if (whiteNoise !== undefined) {
        return (
          <div>
            <AudioOutWhiteNoise amplitude = {Number(whiteNoise) / 10.0}
              context = {context}
              analyser = {this.state.gain}/>
          </div>
        );
      }     // if whiteNoise is set

      // if not muted and whiteNoise is not set, generate an array of
      // AudioOutTone modules
      var returnValue = new Array();

      for(var i = 0; (i < frequencyArray.length); i++) {
        if(gainArray[i] > 0) {
          returnValue.push(
            <div key={i}>
              <AudioOutTone key = {i}
                frequency = {Number(frequencyArray[i])}
                amplitude = {Number(gainArray[i]) / 10.0}
                context = {context}
                analyser = {this.state.gain}/>
            </div>
          );  // returnValue
        }     // if valid gain
      }       // for loop
      return returnValue;
    }       // renderAudioOut function

    // visual aspect of the component
    return(
      <div>
        {renderAudioOut()}
      </div>
    );  // return value
  }     // render function
});     // AudioOut class

// export AudioOut for other modules to use
module.exports = AudioOut;
