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

  describe('handleFormFrequencyTone function', () => {
    // should stop playing on 0,0
    it('should exit on an invalid tone', () => {
      var spy = expect.createSpy();
      var formFrequency = TestUtils.renderIntoDocument(
        <FormFrequency playFrequency={spy}/>
      );

      formFrequency.state.frequencyArray = [0,0];
      formFrequency.state.gainArray = [0,0];
      formFrequency.handleFormFrequencyTone('Tone 3', 1, 1);
      expect(formFrequency.state.frequencyArray).toEqual([0,0]);
      expect(formFrequency.state.gainArray).toEqual([0,0]);
      expect(spy).toNotHaveBeenCalled();
    });       // should exit on an invalid tone

    it('should update first element with playing tone', () => {
      var spy = expect.createSpy();
      var formFrequency = TestUtils.renderIntoDocument(
        <FormFrequency playFrequency={spy}/>
      );

      formFrequency.state.frequencyArray = [0,0];
      formFrequency.state.gainArray = [0,0];
      formFrequency.handleFormFrequencyTone('Tone 1', 1, 1);
      expect(formFrequency.state.frequencyArray).toEqual([1,0]);
      expect(formFrequency.state.gainArray).toEqual([1,0]);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith([1,0], [1,0]);
    });       // should update first element with playing tone

    it('should update second element with playing tone', () => {
      var spy = expect.createSpy();
      var formFrequency = TestUtils.renderIntoDocument(
        <FormFrequency playFrequency={spy}/>
      );

      formFrequency.state.frequencyArray = [0,0];
      formFrequency.state.gainArray = [0,0];
      formFrequency.handleFormFrequencyTone('Tone 2', 1, 1);
      expect(formFrequency.state.frequencyArray).toEqual([0,1]);
      expect(formFrequency.state.gainArray).toEqual([0,1]);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith([0,1], [0,1]);
    });       // should update second element with playing tone

    it('should stop playing on 0,0', () => {
      var spy = expect.createSpy();
      var formFrequency = TestUtils.renderIntoDocument(
        <FormFrequency playFrequency={spy}/>
      );

      formFrequency.state.frequencyArray = [1,0];
      formFrequency.state.gainArray = [1,0];
      formFrequency.handleFormFrequencyTone('Tone 1', 0, 0);
      expect(formFrequency.state.frequencyArray).toEqual([0,0]);
      expect(formFrequency.state.gainArray).toEqual([0,0]);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith();
    });       // should stop playing on 0,0

  });
});     // FormFrequency describe block
