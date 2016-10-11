var React = require('react');
var ReactDOM = require('react-dom');

// Load Main module
var Main = require('Main');


// Load foundation
$(document).foundation();

// App scss
require('style!css!sass!applicationStyles');

ReactDOM.render(
	<Main/>,
	document.getElementById('app')
);
