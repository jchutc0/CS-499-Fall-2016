var React = require('react');
var {Link, IndexLink} = require('react-router');

var FormNav = React.createClass({
	propTypes: {
		setForm: React.PropTypes.func.isRequired
	},

	setForm: function(formNumber) {
		return this.props.setForm(formNumber);
	},

	render: function() {
		return (
			<div className="top-bar">
				<div className="top-bar-left">
					<ul className="menu">
						<li>
							<a onClick={() => {this.setForm(0)}}>Frequency</a>
						</li>
						<li>
							<a onClick={() => {this.setForm(1)}}>Number Pad</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = FormNav;
