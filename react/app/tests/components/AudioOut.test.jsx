var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AudioOut = require('AudioOut');

describe('AudioOut', () => {
  it('should exist', () => {
    expect(AudioOut).toExist();
  });

  /*
  TODO Tests:
  - if this.props.frequencyObj.whiteNoise object is passed, whiteNoise rendered
  - if this.props.frequencyObj.frequency1, gain1 valid, Tone1 rendered
  - if this.props.frequencyObj.frequency2, gain2 valid, Tone2 rendered
  - if no valid this.props.frequencyObj frequency, gain passed, no tones rendered
  */


});
