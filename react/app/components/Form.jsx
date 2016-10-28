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
			this.props.handlePlayFrequency(0, 0, 0, 0);
			// update the state
			this.setState ({
				formDisplayed: formNumber
			});			// setState
		}					// if the formDisplayed changed
	},					// setCurrentForm function

	handlePlayFrequency: function(frequencyObj) {
		function gainFix(gain) {
			if(gain === undefined) {
				return undefined;
			}
			return (gain % 100) / 100.0;
		}			// gainFix function

		return this.props.handlePlayFrequency({
			frequency1: 	frequencyObj.frequency1,
      gain1: 				gainFix(frequencyObj.gain1),
      frequency2: 	frequencyObj.frequency2,
      gain2: 				gainFix(frequencyObj.gain2),
			whiteNoise:		gainFix(frequencyObj.whiteNoise)
		});
	},

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
		function renderCurrentFrom(form, props, handlePlayFrequency) {
			var {
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
					<FormMicrophone context={context}
						analyser={analyser}/>
				);			// case 3 return
				break;
				case 4:
				return (
					<FormErrorTest/>
				);			// case 4 return
				break;
				case 5:
				return (
					<FormKeyboard/>
				);			// case 5 return
				break;
				case 6:
				return(
					<FormWavIn/>
				);			// case 6 return
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
						this.props,
						this.handlePlayFrequency
					)}
				</div>
			</div>
		);
	}
});

// export Form for other modules to use
module.exports = Form;
