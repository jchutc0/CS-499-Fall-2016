/*****
Form class

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
var FormKeyboard = require('FormKeyboard');
var FormMicrophone = require('FormMicrophone');
var FormWavIn = require('FormWavIn');

// Create the Form class
var Form = React.createClass({
	// require the handlePlayFrequency function to pass frequency information
	//   back through Main
	propTypes: {
		handlePlayFrequency: React.PropTypes.func.isRequired,
		context: React.PropTypes.object.isRequired
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
		function renderCurrentFrom(form, props) {
			var {
				handlePlayFrequency,
				context,
				analyser
			} = props;
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
				break;
				case 3:
				return (
					<FormKeyboard/>
				);			// case 2 return
				break;
				case 4:
				return (
					<FormMicrophone context={context}
						analyser={analyser}/>
				);			// case 2 return
				break;
				case 5:
				return (
					<FormWavIn/>
				);			// case 2 return
				break;
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
					{renderCurrentFrom(
						this.state.formDisplayed,
						this.props
					)}
				</div>
			</div>
		);
	}
});

// export Form for other modules to use
module.exports = Form;
