var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var FormNumberPad = require('FormNumberPad');

describe('FormNumberPad', () => {
  it('should exist', () => {
    expect(FormNumberPad).toExist();
  });

  /*
  TODO Tests:
  - test handleKeypress(key) with valid, invalid keys
  - test handleKeyRelease(key) with valid, invalid keys
  - test playTelephony(buttonID) with valid, invalid buttons
  - make sure stopSound gets called on key release
  - make sure playTelephony gets called on keypress
  - make sure playTelephony gets called on button presses
  - make sure stopSound gets called on button releases


  */

});
