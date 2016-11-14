var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var FormKeyboard = require('FormKeyboard');

describe('FormKeyboard', () => {
  it('should exist', () => {
    expect(FormKeyboard).toExist();
  });

  /*
  TODO Tests:
  - test handleButtonDown on various valid frequencies
  - test handleButtonDown on invalid frequencies
  - test handleButtonUp on frequencies
  - make sure sound player gets called on button presses
  - make sure sound off gets called on button releases

  */
});
