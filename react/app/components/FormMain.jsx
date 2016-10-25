/*****
FormMain class

The purpose of this class is to manage the display of the forms and to pass
information between main and the sub-forms
*****/

// Require the React framework
var React = require('react');

// Require other components for sub-forms and form navigation
var FormNav = require('FormNav');
var FormNumberPad = require('FormNumberPad');
var FormFrequency = require('FormFrequency');
var FormWhiteNoise = require('FormWhiteNoise');

// Create the FormMain class
var FormMain = React.createClass({
	// require the handlePlayFrequency function to pass frequency information
	//   back through Main
	propTypes: {
		handlePlayFrequency: React.PropTypes.func.isRequired
	},		// propTypes

	/*
	getInitialState function

	Set up initial form to display to form 0 (FormFrequency)
	*/
	getInitialState: function() {
		return {
			formDisplayed: 0
		};		// return object
	},			// getInitialState function


	/*
	setCurrentForm function

	If the form to display changes, stop the sound and update the state
	Called from the navigation module
	*/
	setCurrentForm: function(formNumber) {
		// check to see if the form to display has changed from the state
		if(this.state.formDisplayed != formNumber) {
			// stop all sound with the mode change
			this.props.handlePlayFrequency(0, 0, 0, 0);
			// update the state
			this.setState ({
				formDisplayed: formNumber
			});			// setState
		}					// if the formDisplayed changed
	},					// setCurrentForm function

	/*
  render function

  renders the component to the web browser -- the default entry point
  */
	render: function() {

		/*
		renderCurrentFrom function

		finds the current form to display from the form parameter and renders the
		proper form
		*/
		function renderCurrentFrom(form, handlePlayFrequency) {
			switch(form) {
				case 1:
				return (
					<FormNumberPad playFrequency={handlePlayFrequency}/>
				);			// case 1 return
				break;
				case 2:
				return (
					<FormWhiteNoise playWhiteNoise={handlePlayFrequency}/>
				);			// case 2 return
				break
				default:
				return (
					<FormFrequency playFrequency={handlePlayFrequency}/>
				);			// default case (0) return
			};				// switch statement
		}						// renderCurrentFrom function

		return (
			<div>
				<FormNav setForm={this.setCurrentForm}/>
				<div>
					{renderCurrentFrom(this.state.formDisplayed, this.props.handlePlayFrequency)}
				</div>
			</div>
		);
	}
});

// export FormMain for other modules to use
module.exports = FormMain;
