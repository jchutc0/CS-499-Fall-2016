/*****
AudioOut Class

The purpose of this class is to make decisions about which other audio
classes to render
*****/

// Require the React framework
var React = require('react');

// Require AudioOut subclasses to render
var AudioOutTone = require('AudioOutTone');
var AudioOutWhiteNoise = require('AudioOutWhiteNoise');

// create the AudioOut class
var AudioOut = React.createClass({

  // Define the expected properties
  propTypes: {
    // The analyser produces the data for the graphs from the output (required)
    analyser        : React.PropTypes.object.isRequired,
    // The context is the audio context that allows sounds to play (required)
    context         : React.PropTypes.object.isRequired,
    // The frequencyArray is an array of frequencies to play
    frequencyArray  : React.PropTypes.array,
    // The gainArray is an array of gain values for the frequencies
    gainArray       : React.PropTypes.array,
    // paused is changed when the the graphs and audio are paused in Main
    paused          : React.PropTypes.bool,
    // whiteNoise is the max gain value for the white noise generator
    whiteNoise      : React.PropTypes.number
  },  // propTypes

  /*
  getDefaultProps function

  Sets default component properties in the event the calling function did not
  pass them -- an empty frequency or gain array will not play a tone
  */
  getDefaultProps: function() {
    return {
      frequencyArray: [],
      gainArray: [],
      paused: false,
      whiteNoise: undefined
    };    // return value
  },      // getDefaultProps function

  getInitialState: function() {
    var {context, analyser} = this.props;
    var gain        = context.createGain();
    gain.gain.value = 0;
    gain.connect(analyser);
    return({
      gain: gain,
      muted: true
    });
  },

  componentWillReceiveProps: function(nextProps) {
    var {
      frequencyArray, gainArray, whiteNoise, soundMute
    } = nextProps;

    var muted = Boolean(
      (frequencyArray.length !== gainArray.length) ||
      ((frequencyArray.length < 1) && (whiteNoise === undefined))
    );

    if(muted !== this.state.muted) {
      this.setState({
        muted: muted
      });
      if(muted) {
        this.state.gain.gain.value = 0;
      } else {
        this.state.gain.gain.value = 1;
      }
      soundMute(muted);
    }
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {

    /*
    renderAudioOut function

    Looks at the props.frequencyObj and either renders AudioOutWhiteNoise if
    a whiteNoise value has been passed down or else renders the dual tone
    generator
    */
    var renderAudioOut = (props) => {
      var {
        frequencyArray, gainArray, whiteNoise, context, paused
      } = props;
      var muted = this.state.muted;
      
      if(muted || paused) {
        return;
      }
      // if((frequencyArray.length !== gainArray.length) || (paused === true)) {
      //   return;
      // }

      if (whiteNoise !== undefined) {
        return (
          <div>
            <AudioOutWhiteNoise amplitude = {Number(whiteNoise) / 10.0}
              context = {context}
              analyser = {this.state.gain}/>
          </div>
        );
      }

      // if(frequencyArray.length < 1) {
      //   // context.suspend();
      //   return (
      //     <div></div>
      //   );
      // }

      var returnValue = new Array();
      // console.log('frequencyArray.length: '+frequencyArray.length);

      for(
        var i = 0;
        ((i < frequencyArray.length) && (i < gainArray.length));
        i ++
      ) {
        if(gainArray[i] > 0) {
          returnValue.push(
            <div key={i}>
              <AudioOutTone key = {i}
                frequency = {Number(frequencyArray[i])}
                amplitude = {Number(gainArray[i]) / 10.0}
                context = {context}
                analyser = {this.state.gain}/>
            </div>
          );
        }
      } // for loop

      return returnValue;

    }       // renderAudioOut function

    // visual aspect of the component
    return(
      <div>
        {renderAudioOut(this.props)}
      </div>
    );  // return value
  }     // render function
});     // AudioOut class

// export AudioOut for other modules to use
module.exports = AudioOut;
