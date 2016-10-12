var React = require('react');

var FormNav = require('FormNav');
var FormNumberPad = require('FormNumberPad');
var FormFrequency = require('FormFrequency');

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

module.exports = FormMain;
