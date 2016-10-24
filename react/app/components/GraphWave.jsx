// Require the React framework
var React = require('react');

var GraphWave = React.createClass({
  render: function() {
    var canvasStyle = {
      border: '1px solid #000000'
    };
    return (
      <div>
        <p>Rendered GraphWave</p>
          <canvas id="GraphWaveCanvas" width="200" height="100" style={canvasStyle}>
          </canvas>
      </div>
    );
  }
});


module.exports = GraphWave;
