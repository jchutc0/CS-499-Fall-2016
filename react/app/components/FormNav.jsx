/*****
FormNav class

The purpose of this class is to display the navigation panel and to report any
change in the form through the setForm prop to FormMain
*****/

// Require the React framework
var React = require('react');

// Create the FormNav class
var FormNav = React.createClass({
	// require the setForm function as a passed property
	propTypes: {
		setForm: React.PropTypes.func.isRequired
	},			// propTypes

	/*
	handleDropdown function

	Invoked by change in the dropdown box - reports change to setForm prop
	*/
	handleDropdown: function() {
		return this.props.setForm(this.refs.selection.selectedIndex);
	},			// handleDropdown

	/*
  render function

  renders the component to the web browser -- the default entry point
  */
	render: function() {
		return (
			<div className="top-bar">
				<div className="top-bar-left">
					<ul className="menu">
						<li>
							Choose One:
						</li>
						<li>
							<select onChange={() => {this.handleDropdown()}} ref='selection'>
								<option>Frequency Generator</option>
								<option>Number Pad</option>
								<option>White Noise Generator</option>
							</select>
						</li>
					</ul>
				</div>
			</div>
		);		// return value
	}				// render function
});				// FormNav class

// export FormNav for other modules to use
module.exports = FormNav;
