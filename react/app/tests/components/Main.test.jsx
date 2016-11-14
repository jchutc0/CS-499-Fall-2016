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
      // arrays to pass to function
      var testFreqs = [440, 350];
      var testGains = [0.1, 0.1];
      var testWhiteNoise = undefined;

      // run the function
      main.handlePlayFrequency(testFreqs, testGains, testWhiteNoise);

      expect(main.state.audioOutFrequencyArray).toBeA('array');
      expect(main.state.audioOutFrequencyArray).toEqual(testFreqs);
      expect(main.state.audioOutGainArray).toBeA('array');
      expect(main.state.audioOutGainArray).toEqual(testGains);
      expect(main.state.audioOutWhiteNoise).toEqual(testWhiteNoise);


    }); // tone values testing

    // test to see if handlePlayFrequency returns an object with the correct
    //   tone values
    it('should return correct white noise values', () => {
      // data to pass to function
      var testFreqs = [];
      var testGains = [];
      var testWhiteNoise = 0.1;

      // run the function
      main.handlePlayFrequency(testFreqs, testGains, testWhiteNoise);

      expect(main.state.audioOutFrequencyArray).toBeA('array');
      expect(main.state.audioOutFrequencyArray).toEqual(testFreqs);
      expect(main.state.audioOutGainArray).toBeA('array');
      expect(main.state.audioOutGainArray).toEqual(testGains);
      expect(main.state.audioOutWhiteNoise).toEqual(testWhiteNoise);
    }); // white noise testing

  });   // handlePlayFrequency describe block

});     // Main describe block
