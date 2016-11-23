var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var FormButton = require('FormButton');

describe('FormButton', () => {
  it('should exist', () => {
    expect(FormButton).toExist();
  });

  /*
  TODO Tests:
  Button up:
    - button press should change state, call function
    - button release and mouse off should do nothing
    - keypress should change state, call function
    - keyrelease should do nothing
  Button down:
  - button release and mouse off should change state, call function
  - button press should do nothing
  - keyrelease should change state, call function
  - keypress should do nothing
  */


});
