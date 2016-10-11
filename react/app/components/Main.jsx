var React = require('react');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var GraphWave = require('GraphWave');
var GraphFrequency = require('GraphFrequency');
var FormMain = require('FormMain');
var NotesToUser = require('NotesToUser');

// Load menu modules
var FormFrequency = require('FormFrequency');
var FormNumberPad = require('FormNumberPad');


var Main = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <p>Rendered Main</p>
        </div>
        <div>
          <div>
            <GraphWave/>
          </div>
          <div>
            <GraphFrequency/>
          </div>
          <div>
            <Router history={hashHistory}>
              <Route path="/" component={FormMain}>
                <Route path="numpad" component={FormNumberPad} />
                <IndexRoute component={FormFrequency} />
              </Route>
            </Router>
          </div>
        </div>
        <div>
          <NotesToUser/>
        </div>
      </div>
    );
  }
});

module.exports = Main;
