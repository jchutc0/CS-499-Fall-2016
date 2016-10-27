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

    navigator.getUserMedia(constraints, this.validStream, this.errorReport);

  },    // componentDidMount

  errorReport: function(e) {
    console.log('Unable to open microphone stream');
  },

  validStream: function(stream) {
    var analyser = this.props.analyser;
    var context = this.props.context;
    var input = context.createMediaStreamSource(stream);
    console.log('Got stream!');
    input.connect(analyser);
    context.resume();
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
    // TODO: need to disconnect input
    // input.disconnect();
    this.state.streamSource.disconnect();
    this.props.analyser.disconnect();
    this.props.context.suspend();
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
