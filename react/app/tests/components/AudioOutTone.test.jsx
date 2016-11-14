var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AudioOutTone = require('AudioOutTone');

describe('AudioOutTone', () => {
  it('should exist', () => {
    expect(AudioOutTone).toExist();
  });

  /*
  TODO Tests:
  Test playSound - takes an object
  {
    context,
    oscillator,
    gain,
    amplitude,
    frequency,
    analyser
  }  (nb: sets gain.gain.value, oscillator.frequency.value; context.resume())
    - pass valid frequencies - make sure returns true
    - pass invalid frequencies - make sure it returns false
  */

});
