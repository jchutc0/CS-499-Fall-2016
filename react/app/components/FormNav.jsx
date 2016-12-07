/*****
FormNav class

The purpose of this class is to display the navigation panel and to report any
change in the form through the setForm prop to Form
*****/

// Require the React framework
var React = require('react');

// Create the FormNav class
var FormNav = React.createClass({
	// require the setForm function as a passed property
	propTypes: {
		setForm: React.PropTypes.func.isRequired,
		formsArray: React.PropTypes.array.isRequired
	},			// propTypes

	/*
	handleDropdown function

	Invoked by change in the dropdown box - reports change to setForm prop
	*/
	handleDropdown: function(e) {
		e.preventDefault();
		return this.props.setForm(this.refs.selection.selectedIndex);
	},			// handleDropdown

	/*
	render function

	renders the component to the web browser -- the default entry point
	*/
	render: function() {

		var renderOptions = (formsArray) => {
			var returnValue = new Array(formsArray.length);
			for(var i = 0; i < formsArray.length; i++) {
				returnValue[i] = (<option key={i}>{formsArray[i].label}</option>);
			}
			return returnValue;
		};


		return (
			<div>
				Choose One:
				<select onChange={this.handleDropdown} ref='selection'>
					{renderOptions(this.props.formsArray)}
				</select>
			</div>
		);		// return value
	}				// render function
});				// FormNav class

// export FormNav for other modules to use
module.exports = FormNav;
