/*****
FormMain class

The purpose of this class is to take input from the user about one or two
tones and send those tones back to the calling class through the required
playFrequency function
*****/

// Require the React framework
var React = require('react');

// Require other components for sub-forms
var FormNav = require('FormNav');
var FormNumberPad = require('FormNumberPad');
var FormFrequency = require('FormFrequency');
var FormWhiteNoise = require('FormWhiteNoise');

var FormMain = React.createClass({
	propTypes: {
		handlePlayTelephony: React.PropTypes.func.isRequired,
		handleStopSound: React.PropTypes.func.isRequired,
		handlePlayFrequency: React.PropTypes.func.isRequired
	},

	getInitialState: function() {
		return {
			formDisplayed: 0
		};
	},

	renderCurrentFrom: function() {
		if(this.state.formDisplayed === 1) {
			return(
				<FormNumberPad playTelephony={this.props.handlePlayTelephony}
					stopSound={this.props.handleStopSound}/>
			);
		} else if(this.state.formDisplayed === 2) {
			return(
				<FormWhiteNoise playWhiteNoise={this.props.handlePlayFrequency}/>
			);
		}
		return (
			<FormFrequency playFrequency={this.props.handlePlayFrequency}/>
		);
	},

	setCurrentForm: function(formNumber) {
		if(this.state.formDisplayed != formNumber) {
			this.setState ({
				formDisplayed: formNumber
			});
		}
	},

	render: function() {
		return (
			<div>
				<FormNav setForm={this.setCurrentForm}/>
				<div>
					{this.renderCurrentFrom()}
				</div>
			</div>
		);
	}
});

// export FormMain for other modules to use
module.exports = FormMain;
