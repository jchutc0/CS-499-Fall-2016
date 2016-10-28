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
});
