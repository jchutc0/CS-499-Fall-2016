var React = require('react');
var GraphWave = require('GraphWave');
var GraphFrequency = require('GraphFrequency');
var FormMain = require('FormMain');
var NotesToUser = require('NotesToUser');

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
            <FormMain/>
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
