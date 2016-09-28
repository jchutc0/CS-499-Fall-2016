// code copied from http://www.html5rocks.com/en/tutorials/getusermedia/intro/

var errorCallback = function(e) {
    console.log('Unable to get user media!');
};

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null;

// navigator.getUserMedia({audio: true},function(stream) {
//   var microphone = context.createMediaStreamSource(stream);
//   var filter = context.createBiquadFilter();
//
//   // microphone -> filter -> destination
//   microphone.connect(filter);
//   filter.connect(context.destination);
// }, errorCallback);

// end of html5rocks code

// code adapted from https://github.com/cwilso/Audio-Input-Effects/blob/master/js/effects.js

var constraints = {
    audio: true
};

navigator.getUserMedia(constraints, gotStream, errorCallback);

function gotStream(stream) {
    var input = audioContext.createMediaStreamSource(stream);
    console.log('Got stream!');
    console.log(input);
}

// end of effects.js code

// MediaStreamAudioSourceNode {mediaStream: MediaStream, context: AudioContext, numberOfInputs: 0, numberOfOutputs: 1, channelCount: 2…}

/*


listener : AudioListener
  dopplerFactor : 1
  forwardX : AudioParam
  forwardY : AudioParam
  forwardZ : AudioParam
  positionX : AudioParam
  positionY : AudioParam
  positionZ : AudioParam
  speedOfSound : 343.3
  upX : AudioParam
  upY : AudioParam
  upZ : AudioParam
  __proto__ : AudioListener
  onstatechange : null
  sampleRate : 44100
  state : "running"
  __proto__ : AudioContext

*/