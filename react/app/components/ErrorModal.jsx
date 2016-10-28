/*****
ErrorModal Class

The purpose of this class is to get audio data in from the microphone and
return it to the calling program in a helpful way. It is not currenly
implemented.
*****/

// Require the React framework
var React = require('react');

// create the ErrorModal class
var ErrorModal = React.createClass({

  // require the clearError function as a passed property
  propTypes: {
    clearError: React.PropTypes.func.isRequired
  },			// propTypes

  getInitialState: function() {
    var title = 'Error';
    if(this.props.title !== undefined) {
      title = this.props.title;
    }
    return ({
      title: title
    });
  },

  /*
  componentDidMount function

  invoked after component mounts
  */
  componentDidMount: function() {
    var modal = new Foundation.Reveal($('#error-modal'));
    if(this.props.message !== undefined) {
      modal.open();
    }
    // display the ErrorModal
  },

  handleButton: function(e) {
    this.props.clearError();
  },

  clearError: function() {
    this.props.clearError();
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <p>
          Rendered ErrorModal
        </p>
        <p>
          <a data-open='error-modal'>Click me for a modal</a>
        </p>
        <div className='reveal' id='error-modal' ref='error-modal' data-reveal
          text-center>
          <h1>Modal Title!</h1>
          <p>Some text</p>
          <button className='button hollow' data-close>
            Close modal
          </button>
        </div>
      </div>
    );    // return value
  }       // render function
});       // ErrorModal class

// export ErrorModal for other modules to use
module.exports = ErrorModal;
