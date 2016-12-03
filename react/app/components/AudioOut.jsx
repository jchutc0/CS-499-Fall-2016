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

  // Require the context object as a prop
  propTypes: {
    context     : React.PropTypes.object.isRequired
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
      whiteNoise: undefined
    };    // return value
  },      // getDefaultProps function

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
        frequencyArray, gainArray, whiteNoise, analyser, context, paused
      } = props;
      if((frequencyArray.length !== gainArray.length) || (paused === true)) {
        return;
      }

      if (whiteNoise !== undefined) {
        return (
          <div>
            <AudioOutWhiteNoise amplitude = {Number(whiteNoise) / 10.0}
              context = {context}
              analyser = {analyser}/>
          </div>
        );
      }

      if(frequencyArray.length < 1) {
        context.suspend();
        return (
          <div></div>
        );
      }

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
                analyser = {analyser}/>
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
