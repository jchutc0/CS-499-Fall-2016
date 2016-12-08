/*****
FormErrorTest Class

The purpose of this class is to test the ErrorModal
*****/

// Require the React framework
var React = require('react');

// create the FormErrorTest class
var FormErrorTest = React.createClass({

  /*
  getInitialState function

  Sets the initial state
  */
  getInitialState: function() {
    return ({
      modalRevealed: false,
    });     // return value
  },        // getInitialState function

  showModal: function(e) {
    var modal = new Foundation.Reveal($('#exampleModal1'));
    modal.open();
    this.setState({
      modalRevealed: !this.state.modalRevealed
    });
  },

  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <div className="reveal" id='exampleModal1' ref='exampleModal1' data-reveal=''>
          {this.props.children}
          <button className="close-button" data-close='' aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p>
          <button className='button' onClick={this.showModal}>
            about
          </button>
        </p>
      </div>
    );    // return value
  }       // render function
});       // FormErrorTest class

// export FormErrorTest for other modules to use
module.exports = FormErrorTest;
