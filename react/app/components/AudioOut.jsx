var React = require('react');

var AudioOut = React.createClass({
  getDefaultProps: function() {
    return {
      playerCommand: '',
      frequency1: 0,
      frequency2: 0,
      playerObject: {
        playerCommand: '',
        numPressed: 0
      }
    };
  },

  getInitialState: function() {
    return {
      playing: false
    };
  },

  playSound: function(frequency1, frequency2) {
    // var context = new AudioContext();
    var context = this.props.playerObject.context;
    var gainNode1 = this.props.playerObject.gainNode1;
    var gainNode2 = this.props.playerObject.gainNode2;
    var context = this.props.playerObject.context;
    var oscillator1 = this.props.playerObject.oscillator1;
    var oscillator2 = this.props.playerObject.oscillator2;

  	if(frequency1 > 0 && frequency2 > 0)
  	{
  		gainNode1.gain.value = 0.1;
  		oscillator1.frequency.value = frequency1;
  		oscillator1.connect(gainNode1);
  		gainNode1.connect(context.destination);

  		gainNode2.gain.value = 0.1;
  		oscillator2.frequency.value = frequency2;
  		oscillator2.connect(gainNode2);
  		gainNode2.connect(context.destination);

  		oscillator1.start(0);
  		oscillator2.start(0);
  	}
  },

  playTelephony: function(buttonID) {
    var frequency1;
    var frequency2;

    // this.stopTelephony();

    switch(buttonID)
    {
      case 0:
        //1 Key
        this.playSound(1209, 697);
        break;
      case 1:
        //2 Key
        this.playSound(1336, 697);
        break;
      case 2:
        //3 Key
        this.playSound(1477, 697);
        break;
      case 3:
        //4 Key
        this.playSound(1209, 770);
        break;
      case 4:
        //5 Key
        this.playSound(1336, 770);
        break;
      case 5:
        //6 Key
        this.playSound(1477, 770);
        break;
      case 6:
        //7 Key
        this.playSound(1209, 852);
        break;
      case 7:
        //8 Key
        this.playSound(1336, 852);
        break;
      case 8:
        //9 Key
        this.playSound(1477, 852);
        break;
      case 9:
        //* Key
        this.playSound(1209, 941);
        break;
      case 10:
        //0 Key
        this.playSound(1336, 941);
        break;
      case 11:
        //# Key
        this.playSound(1477, 941);
        break;
      default:
        this.playSound(0, 0);
        break;
    }
    this.playSound(frequency1, frequency2);
  },

  stopTelephony: function() {
    var context = this.props.playerObject.context;
    var oscillator1 = this.props.playerObject.oscillator1;
    var oscillator2 = this.props.playerObject.oscillator2;

    oscillator1.stop(0);
    oscillator2.stop(0);

  },

  render: function() {
    if(this.props.playerObject.playerCommand === 'playTelephony') {
      this.playTelephony(this.props.playerObject.numPressed);
    } else if(this.props.playerObject.playerCommand === 'stop') {
      this.stopTelephony();
    }

    return (
      <div>
        Rendered AudioOut {this.props.playerCommand}
      </div>
    );
  }
});

module.exports = AudioOut;
