var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var FormFrequency = require('FormFrequency');

describe('FormFrequency', () => {
  it('should exist', () => {
    expect(FormFrequency).toExist();
  });

  it('should call playFrequency()', () => {
    var spy = expect.createSpy();
    var formFrequency = TestUtils.renderIntoDocument(<FormFrequency
      playFrequency={spy}/>);
      // var $el = $(ReactDOM.findDOMNode(formFrequency));

      formFrequency.refs.frequency1.value = 440;
      formFrequency.refs.gain1.value = 10;
      // TestUtils.Simulate.submit($el.find('frequency-form')[0]);
      TestUtils.Simulate.click(formFrequency.refs.startSound);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({
        frequency1: '440',
        gain1: '10',
        frequency2: '',
        gain2: ''
      });
  });
});
