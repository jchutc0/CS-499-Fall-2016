/*****
FormShephards class

The purpose of this class is to implement the Shephard's tone auditory illusion
*****/

// Require the React framework
var React = require('react');

// Create the FormShephards class
var FormShephards = React.createClass({

  // require the playFrequency function as a passed property
  propTypes: {
    playFrequency: React.PropTypes.func.isRequired
  },      // propTypes

  //// Class constants ////
  // low tones, the base tones to generate for the step up
  lowTones: [
    16.35,
    17.32,
    18.35,
    19.45,
    20.60,
    21.83,
    23.12,
    24.50,
    25.96,
    27.50,
    29.14,
    30.87
  ],

  // maxGain, the max gain level we'll use
  maxGain: .5,
  minGain: 0.00001,

  // maxFrequency, the highest frequency level we'll use
  maxFrequency: 15000,

  getInitialState: function() {
    return {
      playing: false,
      lowTone: 0
    };
  },

  playShephards: function(lowTone) {
    if(!this.state.playing) {
      return;
    }

    var frequencyArray = [];
    var gainArray;
    for (
      var frequency = this.lowTones[lowTone];
      frequency < this.maxFrequency;
      frequency = frequency * 2
    ) {
      frequencyArray.push(frequency);
      // gainArray.push(this.maxGain);
    }
    gainArray = new Array(frequencyArray.length);
    var rowE = new Array(frequencyArray.length);
    var rowF = new Array(frequencyArray.length);
    var rowG = new Array(frequencyArray.length);
    var rowH = new Array(frequencyArray.length);
    var lowLog = Math.log(frequencyArray[0]);
    var highLog = Math.log(frequencyArray[frequencyArray.length-1]) - lowLog;
    for(var i = 0; i < frequencyArray.length; i++) {
      // gainArray[i] = Math.exp(-1 * Math.pow((2 * i / gainArray.length) - 1, 2)) / (Math.sqrt(Math.PI));
      // to break this up...
      rowE[i] = Math.log(frequencyArray[i]);
      rowF[i] = (2 * (rowE[i] - lowLog) / highLog) - 1;
      rowG[i] = Math.exp(rowF[i] * rowF[i] * -1);
      rowH[i] = rowG[i] / Math.sqrt(Math.PI) / 2;
      gainArray[i] = rowG[i] * 10;
    }
    console.log('low log: '+lowLog);
    console.log('high log: '+highLog);
    console.log('rowH: '+rowH);
    console.log('gain array: '+ gainArray);
    this.props.playFrequency(frequencyArray, gainArray);
  },

  /*

  bell curve algorithm:https://codepen.io/zapplebee/pen/ByvmMo

  var wave = document.getElementById('wave');

function makePath(points){
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M 0,50 ' + points.join(' ') + ' 100,50 z');
  path.setAttribute('transform', 'translate(0,0)');
  wave.appendChild(path);
}

function plotOnBell(x,scale){
  //This is the real workhorse of this algorithm. It returns values along a bell curve from 0 - 1 - 0 with an input of 0 - 1.
  scale = scale || false;
  var stdD = .125
  var mean = .5
  if(scale){
    return  1 / (( 1/( stdD * Math.sqrt(2 * Math.PI) ) ) * Math.pow(Math.E , -1 * Math.pow(x - mean, 2) / (2 * Math.pow(stdD,2))));
  }else{
     return (( 1/( stdD * Math.sqrt(2 * Math.PI) ) ) * Math.pow(Math.E , -1 * Math.pow(x - mean, 2) / (2 * Math.pow(stdD,2)))) * plotOnBell(.5,true);
  }
}

var step = .5;
var limit = 100;
var shapeAPoints = [];
var shapeBPoints = [];
var shapeCPoints = [];
var shapeDPoints = [];
var shapeEPoints = [];

for(i = step ; i < limit ; i += step){

  var plot = plotOnBell(i / limit);

  shapeAPoints.push([i, 50 - (50 * plot)]);
  shapeBPoints.push([i, 50 - (40 * plot)]);
  shapeCPoints.push([i, 50 - (30 * plot)]);
  shapeDPoints.push([i, 50 - (20 * plot)]);
  shapeEPoints.push([i, 50 - (10 * plot)]);

}


makePath(shapeAPoints);
makePath(shapeBPoints);
makePath(shapeCPoints);
makePath(shapeDPoints);
makePath(shapeEPoints);


  */

  toggleSound: function(e) {
    e.preventDefault();
    var newPlaying = !this.state.playing;
    this.setState({
      playing: newPlaying
    });
    if(newPlaying) {
      this.playShephards(this.state.lowTone);
    } else {
      this.props.playFrequency([], []);
    }
    console.log('playing: '+this.state.playing);
  },

  soundUp: function(e) {
    e.preventDefault();
    this.setState({
      lowTone: (this.state.lowTone + 1) % this.lowTones.length
    });
    if(this.state.playing) {
      this.playShephards(this.state.lowTone);
    }
  },

  soundDown: function(e) {
    e.preventDefault();
    this.setState({
      lowTone: (this.state.lowTone + this.lowTones.length - 1) % this.lowTones.length
    });
    if(this.state.playing) {
      this.playShephards(this.state.lowTone);
    }
  },


  /*
  render function

  renders the component to the web browser -- the default entry point
  */
  render: function() {
    return (
      <div>
        <p>TODO: Implement the twist</p>
        <button type='button' className='expanded button' ref='stopSound'
          onClick={this.toggleSound}>Toggle Sound</button>
        <button type='button' className='expanded button' ref='stopSound'
          onClick={this.soundUp}>Sound Up</button>
        <button type='button' className='expanded button' ref='stopSound'
          onClick={this.soundDown}>Sound Down</button>
      </div>
    );        // return value
  }           // render function
});           // FormShephards class

// export FormShephards for other modules to use
module.exports = FormShephards;
