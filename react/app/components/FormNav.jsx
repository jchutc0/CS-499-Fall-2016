var React = require('react');
var {Link, IndexLink} = require('react-router');

var FormNav = (props) => {
	return (
		<div className="top-bar">
			<div className="top-bar-left">
				<ul className="menu">
          <li className="menu-text">Audio Frequency Analyzer</li>
					<li>
						<IndexLink to="/" activeClassName="active-link">Frequency</IndexLink>
					</li>
					<li>
						<Link to="/numpad" activeClassName="active-link">Number Pad</Link>
					</li>
				</ul>
			</div>
			<div className="top-bar-right">
				<ul className="menu">
					<li className="menu-text">by <a href="http://www.teamaudiophile.com/" target="_new">Team AudioPhile</a></li>
				</ul>
			</div>
		</div>
	)
};

module.exports = FormNav;
