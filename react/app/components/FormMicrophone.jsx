/*****
FormMicrophone Class

The purpose of this class is
*****/

// Require the React framework
var React = require('react');

// create the FormMicrophone class
var FormMicrophone = React.createClass({

  getInitialState: function() {
    return {
      streamSource: undefined
    };
  },

  /*
  componentDidMount function

  invoked after component mounts
  */
  componentDidMount: function() {
    var context = this.props.context;

    var constraints = {
      audio: true
    }

    navigator.getUserMedia = (
      navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia
    );

    navigator.getUserMedia(constraints, this.validStream, this.errorReport);

  },    // componentDidMount

  errorReport: function(e) {
    console.log('Unable to open microphone stream');
  },

  validStream: function(stream) {
    var {analyser, context, soundMute} = this.props;
    var input = context.createMediaStreamSource(stream);
    soundMute(false);
    analyser.disconnect();
    input.connect(analyser);
    this.setState({
      streamSource: input
    });
  },

  /*
  componentWillUnmount function

  This function is called as the component is no longer rendering

  Stops the oscillator to turn off tone generation
  */
  componentWillUnmount: function() {
    var {streamSource} = this.state;
    var {analyser, context, soundMute} = this.props;
    soundMute(true);
    streamSource.disconnect();
    analyser.disconnect();
    analyser.connect(context.destination);
  },


  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <p>
          This class will read in data from the microphone.
        </p>
      </div>
    );    // return value
  }       // render function
});       // FormMicrophone class

// export FormMicrophone for other modules to use
module.exports = FormMicrophone;
