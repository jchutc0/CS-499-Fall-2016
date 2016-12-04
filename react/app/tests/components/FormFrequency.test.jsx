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

  // describe('playFrequency calls', () => {
  //   var spy = expect.createSpy();
  //   var formFrequency;
  //
  //   it('should call playFrequency() with 440/10', () => {
  //     spy = expect.createSpy();
  //     formFrequency = TestUtils.renderIntoDocument(
  //       <FormFrequency playFrequency={spy}/>
  //     );
  //
  //     formFrequency.refs.frequency1.value = '440';
  //     formFrequency.refs.gain1.value = '10';
  //     formFrequency.refs.frequency2.value = '';
  //     formFrequency.refs.gain2.value = '';
  //     TestUtils.Simulate.click(formFrequency.refs.startSound);
  //
  //     expect(spy).toHaveBeenCalled();
  //     expect(spy).toHaveBeenCalledWith([440], [10]);
  //   });   // it should call playFrequency() with 440/10
  //
  //
  //   it('should call playFrequency() with 1/1', () => {
  //     spy = expect.createSpy();
  //     formFrequency = TestUtils.renderIntoDocument(
  //       <FormFrequency playFrequency={spy}/>
  //     );
  //
  //     formFrequency.refs.frequency1.value = '1';
  //     formFrequency.refs.gain1.value = '1';
  //     formFrequency.refs.frequency2.value = '';
  //     formFrequency.refs.gain2.value = '';
  //     TestUtils.Simulate.click(formFrequency.refs.startSound);
  //
  //     expect(formFrequency.refs.frequency1.value).toEqual('20');
  //     expect(formFrequency.refs.frequency2.value).toEqual('20');
  //     expect(formFrequency.refs.gain1.value).toEqual('1');
  //     expect(formFrequency.refs.gain2.value).toEqual('');
  //
  //     expect(spy).toHaveBeenCalled();
  //     expect(spy).toHaveBeenCalledWith([20], [1]);
  //   });   // it should call playFrequency() with 1/0.1
  //
  //
  //   it('should call playFrequency() with low frequency for 0/10', () => {
  //     spy = expect.createSpy();
  //     formFrequency = TestUtils.renderIntoDocument(
  //       <FormFrequency playFrequency={spy}/>
  //     );
  //
  //     formFrequency.refs.frequency1.value = '0';
  //     formFrequency.refs.gain1.value = '10';
  //     formFrequency.refs.frequency2.value = '';
  //     formFrequency.refs.gain2.value = '';
  //     TestUtils.Simulate.click(formFrequency.refs.startSound);
  //
  //     expect(formFrequency.refs.frequency1.value).toEqual('20');
  //     expect(formFrequency.refs.frequency2.value).toEqual('20');
  //     expect(formFrequency.refs.gain1.value).toEqual('10');
  //     expect(formFrequency.refs.gain2.value).toEqual('');
  //     expect(spy).toHaveBeenCalled();
  //     expect(spy).toHaveBeenCalledWith([20], [10]);
  //
  //   });   // it should call playFrequency() with blank arrays for 0/10
  //
  //
  //   it('should call playFrequency() with blank arrays for 440/0', () => {
  //     spy = expect.createSpy();
  //     formFrequency = TestUtils.renderIntoDocument(
  //       <FormFrequency playFrequency={spy}/>
  //     );
  //
  //     formFrequency.refs.frequency1.value = '440';
  //     formFrequency.refs.gain1.value = '0';
  //     formFrequency.refs.frequency2.value = '';
  //     formFrequency.refs.gain2.value = '';
  //     TestUtils.Simulate.click(formFrequency.refs.startSound);
  //
  //     expect(spy).toHaveBeenCalled();
  //     expect(spy).toHaveBeenCalledWith([], []);
  //   });   // it should call playFrequency() with blank arrays for 440/0
  //
  //
  //
  //   it('should call playFrequency() with blank arrays for 0/0', () => {
  //     spy = expect.createSpy();
  //     formFrequency = TestUtils.renderIntoDocument(
  //       <FormFrequency playFrequency={spy}/>
  //     );
  //
  //     formFrequency.refs.frequency1.value = '0';
  //     formFrequency.refs.gain1.value = '0';
  //     formFrequency.refs.frequency2.value = '';
  //     formFrequency.refs.gain2.value = '';
  //     TestUtils.Simulate.click(formFrequency.refs.startSound);
  //
  //     expect(spy).toHaveBeenCalled();
  //     expect(spy).toHaveBeenCalledWith([], []);
  //   });   // it should call playFrequency() with blank arrays for 0/0
  //
  //
  //
  // });
  /*
  TODO Tests:
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
