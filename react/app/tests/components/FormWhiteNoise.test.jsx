var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var FormWhiteNoise = require('FormWhiteNoise');

describe('FormWhiteNoise', () => {
  it('should exist', () => {
    expect(FormWhiteNoise).toExist();
  });

  /*
  TODO Tests:
  - make sure Play White Noise button calls playWhiteNoise
  - make sure playWhiteNoise sets the state right
  - make sure playWhiteNoise passes this.props.playWhiteNoise correct values
  - make sure Stop White Noise button calls stopWhiteNoise
  - make sure stopWhiteNoise sets the state right
  - make sure stopWhiteNoise passes this.props.playWhiteNoise correct values
  - make sure renderPlayWhiteNoiseButton sends correct buttons based on state
  */


});
