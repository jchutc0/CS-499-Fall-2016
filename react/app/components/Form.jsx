/*****
Form class

The purpose of this class is to manage the display of the forms and to pass
information between main and the sub-forms
*****/

// Require the React framework
var React = require('react');

// Require other components for sub-forms and form navigation
var FormErrorTest = require('FormErrorTest');
var FormFrequency = require('FormFrequency');
var FormKeyboard = require('FormKeyboard');
var FormMicrophone = require('FormMicrophone');
var FormNav = require('FormNav');
var FormNumberPad = require('FormNumberPad');
var FormShephards = require('FormShephards');
var FormWavIn = require('FormWavIn');
var FormWhiteNoise = require('FormWhiteNoise');

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
			this.props.handlePlayFrequency([], []);
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

		var {
			context,
			analyser,
			handlePlayFrequency
		} = this.props;

		var formsArray = [
			{
				module: (<FormFrequency playFrequency={handlePlayFrequency}/>),
				label: 'Frequency Generator'
			},
			{
				module: (<FormNumberPad playFrequency={handlePlayFrequency}/>),
				label: 'Number Pad'
			},
			{
				module: (<FormWhiteNoise playWhiteNoise={handlePlayFrequency}/>),
				label: 'White Noise Generator'
			},
			{
				module: (<FormMicrophone context={context} analyser={analyser}/>),
				label: 'Microphone Input'
			},
			{
				module: (<FormKeyboard playFrequency={handlePlayFrequency}/>),
				label: 'Music Keybaord Input'
			},
			{
				module: (<FormShephards playFrequency={handlePlayFrequency}/>),
				label: "Shephard's Tone"
			},
			{
				module: (<FormWavIn/>),
				label: 'TODO: Wav File Input'
			},
			{
				module: (<FormErrorTest/>),
				label: 'testing - error modal'
			}
		];

		/*
		renderCurrentFrom function

		finds the current form to display from the form parameter and renders the
		proper form
		*/
		var renderCurrentFrom = (form) => {

			if(
				(Number.isInteger(form)) &&
				(form >= 0) &&
				(form <= formsArray.length)
			) {
				return formsArray[form].module;
			} else {
				return formsArray[0].module;
			}
		}						// renderCurrentFrom function

		return (
			<div>
				<FormNav setForm={this.setCurrentForm} formsArray={formsArray}/>
				<div>
					{renderCurrentFrom(this.state.formDisplayed)}
				</div>
			</div>
		);
	}
});

// export Form for other modules to use
module.exports = Form;
