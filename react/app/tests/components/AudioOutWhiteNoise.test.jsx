var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AudioOutWhiteNoise = require('AudioOutWhiteNoise');

describe('AudioOutWhiteNoise', () => {
  it('should exist', () => {
    expect(AudioOutWhiteNoise).toExist();
  });
});
