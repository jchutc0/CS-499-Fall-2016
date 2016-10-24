// Require the React framework
var React = require('react');
var {Link, IndexLink} = require('react-router');

var FormNav = React.createClass({
	propTypes: {
		setForm: React.PropTypes.func.isRequired
	},

	handleDropdown: function() {
		var selection = this.refs.selection.selectedIndex;

		console.log('Got here. ' + selection);
		return this.props.setForm(selection);
	},

	render: function() {
		return (
			<div className="top-bar">
				<div className="top-bar-left">
					<ul className="menu">
						<li>
							Choose One:
						</li>
						<li>
							<select onChange={() => {this.handleDropdown(1)}} ref='selection'>
								<option>Frequency Generator</option>
								<option>Number Pad</option>
								<option>White Noise Generator</option>
							</select>
						</li>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = FormNav;
