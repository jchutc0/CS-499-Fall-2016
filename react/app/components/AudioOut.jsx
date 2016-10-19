var React = require('react');

var AudioOut = React.createClass({
  getDefaultProps: function() {
    return {
      frequencyObj: {
        frequency1: 0,
        gain1: 0,
        frequency2: 0,
        gain2: 0
      }
    };
  },

  getInitialState: function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var context = new AudioContext();
    var oscillator1 = context.createOscillator();
    var oscillator2 = context.createOscillator();
    var gain1 = context.createGain();
    var gain2 = context.createGain();

    var bufferSize = 4096;
    var whiteNoise = context.createScriptProcessor(bufferSize, 1, 1);

    whiteNoise.onaudioprocess = this.generateWhiteNoise;

    return {
      context: context,
      oscillator1: oscillator1,
      isPlaying1: false,
      gain1: gain1,
      oscillator2: oscillator2,
      gain2: gain2,
      isPlaying2: false,
      whiteNoise: whiteNoise,
      whiteNoiseBufferSize: bufferSize
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var context = this.state.context;
    var whiteNoise = this.state.whiteNoise;

    // turn off white noise generator
    whiteNoise.disconnect();

    if(this.state.isPlaying1) {
      var oscillator1 = this.state.oscillator1;
      oscillator1.stop();
      oscillator1.disconnect();
      oscillator1 = context.createOscillator();
      this.setState({
        oscillator1: oscillator1
      });
    }

    if(this.state.isPlaying2) {
      var oscillator2 = this.state.oscillator2;
      oscillator2.stop();
      oscillator2 = context.createOscillator();
      this.setState({
        oscillator2: oscillator2,
      });
    }

    var isPlaying2;
    var isPlaying1 = isPlaying2 = (
      (nextProps.frequencyObj.playTelephony !== undefined) &&
      (nextProps.frequencyObj.playTelephony >= 0) &&
      (nextProps.frequencyObj.playTelephony <= 11)
    )

    isPlaying1 = (
      (
        (nextProps.frequencyObj.frequency1 !== undefined) &&
        (nextProps.frequencyObj.frequency1 > 0) &&
        (nextProps.frequencyObj.gain1 > 0)
      ) || isPlaying1
    );

    if(isPlaying1 !== this.state.isPlaying1) {
      this.setState({
        isPlaying1: isPlaying1
      });
    }

    var isPlaying2 = (
      (
        (nextProps.frequencyObj.frequency2 !== undefined) &&
        (nextProps.frequencyObj.frequency2 > 0) &&
        (nextProps.frequencyObj.gain2 > 0)
      ) || isPlaying2
    );
    if(isPlaying2 !== this.state.isPlaying2) {
      this.setState({
        isPlaying2: isPlaying2
      });
    }

    // if whiteNoise is defined, generate whiteNoiseBuffer
    if (nextProps.frequencyObj.whiteNoise !== undefined) {
      console.log('Will set next whiteNoise');
      var bufferSize = this.state.whiteNoiseBufferSize;
      var whiteNoiseBuffer = new Array(bufferSize);

      for(var i = 0; i < bufferSize; i++) {
        whiteNoiseBuffer[i] = Math.random() * 2 * nextProps.frequencyObj.whiteNoise - 1;
      }
      for(var i = 0; i < 5; i++) {
        console.log('whiteNoiseBuffer[' + i + '] = ' + whiteNoiseBuffer[i]);
      }
    }

  },

  playSound: function(frequency1, gain1, frequency2, gain2) {

    var context = this.state.context;
    var oscillator1 = this.state.oscillator1;
    var oscillator2 = this.state.oscillator2;
    var gainNode1 = this.state.gain1;
    var gainNode2 = this.state.gain2;

    if((frequency1 > 0) && (gain1 > 0)) {
        		gainNode1.gain.value = gain1;
        		oscillator1.frequency.value = frequency1;
        		oscillator1.connect(gainNode1);
        		gainNode1.connect(context.destination);

        		oscillator1.start(0);
    }

    if((frequency2 > 0) && (gain2 > 0)) {
      gainNode2.gain.value = gain2;
      oscillator2.frequency.value = frequency2;
      oscillator2.connect(gainNode2);
      gainNode2.connect(context.destination);

      oscillator2.start(0);
    }

  },

  generateWhiteNoise: function(e) {
    var bufferSize = this.state.whiteNoiseBufferSize;

    var output = e.outputBuffer.getChannelData(0);
    for(var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 * this.props.frequencyObj.whiteNoise - 1;
    }
  },

  playWhiteNoise: function() {

    var context = this.state.context;
    var whiteNoise = this.state.whiteNoise;

    if(this.props.frequencyObj.whiteNoise > 0) {
      whiteNoise.connect(context.destination);
    }
  },


  playTelephony: function(buttonID) {
    var frequency1;
    var frequency2;

    switch(buttonID)
    {
      case 0:
      //1 Key
      this.playSound(1209, 0.1, 697, 0.1);
      break;
      case 1:
      //2 Key
      this.playSound(1336, 0.1, 697, 0.1);
      break;
      case 2:
      //3 Key
      this.playSound(1477, 0.1, 697, 0.1);
      break;
      case 3:
      //4 Key
      this.playSound(1209, 0.1, 770, 0.1);
      break;
      case 4:
      //5 Key
      this.playSound(1336, 0.1, 770, 0.1);
      break;
      case 5:
      //6 Key
      this.playSound(1477, 0.1, 770, 0.1);
      break;
      case 6:
      //7 Key
      this.playSound(1209, 0.1, 852, 0.1);
      break;
      case 7:
      //8 Key
      this.playSound(1336, 0.1, 852, 0.1);
      break;
      case 8:
      //9 Key
      this.playSound(1477, 0.1, 852, 0.1);
      break;
      case 9:
      //* Key
      this.playSound(1209, 0.1, 941, 0.1);
      break;
      case 10:
      //0 Key
      this.playSound(1336, 0.1, 941, 0.1);
      break;
      case 11:
      //# Key
      this.playSound(1477, 0.1, 941, 0.1);
      break;
      default:
      this.playSound(0, 0, 0, 0);
      break;
    }
  },

  render: function() {
    if(this.props.frequencyObj.playTelephony !== undefined) {
      this.playTelephony(this.props.frequencyObj.playTelephony);
    } else if (this.props.frequencyObj.whiteNoise !== undefined) {
      this.playWhiteNoise();
    } else {
      this.playSound(
        this.props.frequencyObj.frequency1,
        this.props.frequencyObj.gain1,
        this.props.frequencyObj.frequency2,
        this.props.frequencyObj.gain2
      );
    }

    return(
      <div>
        Rendered AudioOut
      </div>
    );
  }
});

module.exports = AudioOut;
