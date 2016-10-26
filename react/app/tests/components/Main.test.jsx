var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Main = require('Main');
var main = TestUtils.renderIntoDocument(<Main/>);


// create describe group for Main component
describe('Main', () => {
  // test to see if Main renders properly
  it('should exist', () => {
    expect(Main).toExist();
  });   // Main should exist

  // create describe group for handlePlayFrequency
  describe('handlePlayFrequency', () => {

    // test to see if handlePlayFrequency returns an object with the correct
    //   tone values
    it('should return correct tone values', () => {
      // object to pass to function
      var testObject = {
        frequency1: 440,
        gain1: 0.1,
        frequency2: 350,
        gain2: 0.1
      };  // testObject

      // expected return value from function
      var expectedResult = {
        ...testObject,
        whiteNoise: undefined
      };

      // run the function
      main.handlePlayFrequency(testObject);

      expect(main.state.audioOutObject).toBeA('object');
      expect(main.state.audioOutObject).toEqual(expectedResult);
    }); // tone values testing

    // test to see if handlePlayFrequency returns an object with the correct
    //   tone values
    it('should return correct white noise values', () => {
      // object to pass to function
      var testObject = {
        whiteNoise: 0.1
      };  // testObject

      // expected return value from function
      var expectedResult = {
        ...testObject,
        frequency1: undefined,
        frequency2: undefined,
        gain1: undefined,
        gain2: undefined,
      };

      // run the function
      main.handlePlayFrequency(testObject);

      expect(main.state.audioOutObject).toBeA('object');
      expect(main.state.audioOutObject).toEqual(expectedResult);
    }); // white noise testing

  });   // handlePlayFrequency describe block

});     // Main describe block
