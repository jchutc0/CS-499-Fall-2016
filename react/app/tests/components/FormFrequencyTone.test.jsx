var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var FormFrequencyTone = require('FormFrequencyTone');

describe('FormFrequencyTone', () => {
  it('should exist', () => {
    expect(FormFrequencyTone).toExist();
  });   // should exist

  describe('checkValidSubmit function', () => {
    var spy = expect.createSpy();
    var formFrequencyTone = TestUtils.renderIntoDocument(
      <FormFrequencyTone toneID={'ID'}
        updateTone={spy}/>
    );

    it('should fix frequency over max', () => {
      formFrequencyTone.refs.frequency.value = 20001;
      formFrequencyTone.refs.gain.value = 5;
      var result = formFrequencyTone.checkValidSubmit();
      expect(result).toBe(false);
      expect(formFrequencyTone.refs.gain.value).toEqual(0);
      expect(formFrequencyTone.refs.frequency.value).toEqual(20000);
    });       // should fix frequency over max

    it('should fix frequency under min', () => {
      formFrequencyTone.refs.frequency.value = 19;
      formFrequencyTone.refs.gain.value = 5;
      var result = formFrequencyTone.checkValidSubmit();
      expect(result).toBe(false);
      expect(formFrequencyTone.refs.gain.value).toEqual(0);
      expect(formFrequencyTone.refs.frequency.value).toEqual(20);
    });       // should fix frequency under min

    it('should return 0 gain as invalid', () => {
      formFrequencyTone.refs.frequency.value = 440;
      formFrequencyTone.refs.gain.value = 0;
      var result = formFrequencyTone.checkValidSubmit();
      expect(result).toBe(false);
      expect(formFrequencyTone.refs.gain.value).toEqual(0);
      expect(formFrequencyTone.refs.frequency.value).toEqual(440);
    });       // should fix frequency under min

    it('should validate good frequency', () => {
      formFrequencyTone.refs.frequency.value = 440;
      formFrequencyTone.refs.gain.value = 5;
      var result = formFrequencyTone.checkValidSubmit();
      expect(result).toBe(true);
      expect(formFrequencyTone.refs.gain.value).toEqual(5);
      expect(formFrequencyTone.refs.frequency.value).toEqual(440);
    });       // should fix frequency under min

  });         // checkValidSubmit function


});     // FormFrequency describe block
