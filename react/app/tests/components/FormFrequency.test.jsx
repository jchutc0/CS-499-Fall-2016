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

  describe('playFrequency calls', () => {
    var spy = expect.createSpy();
    var formFrequency = TestUtils.renderIntoDocument(<FormFrequency
      playFrequency={spy}/>);

    it('should call playFrequency() with 440/10', () => {
        formFrequency.refs.frequency1.value = '440';
        formFrequency.refs.gain1.value = '10';
        formFrequency.refs.frequency2.value = '';
        formFrequency.refs.gain2.value = '';
        TestUtils.Simulate.click(formFrequency.refs.startSound);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({
          frequency1: '440',
          gain1: '10',
          frequency2: '',
          gain2: ''
        });
      });   // it should call playFrequency() with 440/10
      // it('should call playFrequency() with 1/0.1', () => {
      //   formFrequency.refs.frequency1.value = '1';
      //   formFrequency.refs.gain1.value = '0.1';
      //   formFrequency.refs.frequency2.value = '';
      //   formFrequency.refs.gain2.value = '';
      //   TestUtils.Simulate.click(formFrequency.refs.startSound);
      //
      //   expect(spy).toHaveBeenCalled();
      //   expect(spy).toHaveBeenCalledWith({
      //     frequency1: '1',
      //     gain1: '0.1',
      //     frequency2: '',
      //     gain2: ''
      //   });
      // });   // it should call playFrequency() with 1/0.1


    });
  /*
  TODO Tests:
  - check playFrequency on edge cases
  - check playFrequency on invalid freq, invalid gain
  - check clearForm with data
  - check clearForm with no data
  - test renderPlayFrequencyButton()

  */


  // describe('render', () => {
  //   it('should render pause when started', () => {
  //     var formFrequency = TestUtils.renderIntoDocument(<FormFrequency/>);
  //     var $el = $(ReactDOM.findDOMNode(controls));
  //     var $pauseButton = $el.find('button:contains(Pause)');
  //
  //     expect($pauseButton.length).toBe(1);
  //   }); // should render pause when started block
  // });   // render describe block
});     // FormFrequency describe block
