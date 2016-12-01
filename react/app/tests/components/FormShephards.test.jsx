var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var FormShephards = require('FormShephards');

describe('FormShephards', () => {
  it('should exist', () => {
    expect(FormShephards).toExist();
  });

  /*
  TODO Tests:
  playShephards(lowTone, arrayBase)
  - Create a generateGainArray function to get a testable gain
  - values < 440 go up, values > 440 go down
  - spy on this.props.playFrequency(frequencyArray, gainArray) for values
    - since generateGainArray works, use it

  need tests for generateGainArray
  need tests for stopSound

  maybe move stopSound logic from componentWillUpdate to playShephards

  playShephards should call the spy with [],[] if !isPlaying
  otherwise, freq = generateFrequencyArray gain = generateGainArray and calls
  with freq, gain -- test all 12 tones in all 10 base positions :P


  */
  describe('Sound Up Button', () => {
    it('should increase lowTone by 1', () => {
      var toneArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      var toneResultArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
      var offsetResultArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9];

      for(var i = 0; i < toneArray.length; i++) {
        var spy = expect.createSpy();
        var formShephards = TestUtils.renderIntoDocument(
          <FormShephards playFrequency={spy}/>
        );
        formShephards.state.lowTone = toneArray[i];
        formShephards.state.arrayBase = 0;
        formShephards.state.isPlaying = false;
        TestUtils.Simulate.click(formShephards.refs.soundUp);
        expect(formShephards.state.lowTone).toEqual(toneResultArray[i]);
        expect(formShephards.state.arrayBase).toEqual(offsetResultArray[i]);
        expect(formShephards.state.isPlaying).toEqual(true);
        expect(spy).toHaveBeenCalled();
      }
    });   // should increase lowTone by 1

    it('should decrease arrayBase by 1 on B->C', () => {
      var offsetArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var offsetResultArray = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];

      for(var i = 0; i < offsetArray.length; i++) {
        var spy = expect.createSpy();
        var formShephards = TestUtils.renderIntoDocument(
          <FormShephards playFrequency={spy}/>
        );
        formShephards.state.lowTone = 11;
        formShephards.state.arrayBase = offsetArray[i];
        formShephards.state.isPlaying = false;
        TestUtils.Simulate.click(formShephards.refs.soundUp);
        expect(formShephards.state.lowTone).toEqual(0);
        expect(formShephards.state.arrayBase).toEqual(offsetResultArray[i]);
        expect(formShephards.state.isPlaying).toEqual(true);
        expect(spy).toHaveBeenCalled();
      }   // for loop
    });   // should decrease arrayBase by 1 on B->C

    it('should not stop playing tones', () => {
      var toneArray = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        11, 11, 11, 11, 11, 11, 11, 11, 11
      ];
      var offsetArray = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 2, 3, 4, 5, 6, 7, 8, 9
      ];

      for(var i = 0; i < toneArray.length; i++) {
        var spy = expect.createSpy();
        var formShephards = TestUtils.renderIntoDocument(
          <FormShephards playFrequency={spy}/>
        );
        formShephards.state.lowTone = toneArray[i];
        formShephards.state.arrayBase = offsetArray[i];
        formShephards.state.isPlaying = true;
        TestUtils.Simulate.click(formShephards.refs.soundUp);
        expect(formShephards.state.isPlaying).toEqual(true);
        expect(spy).toHaveBeenCalled();
      }   // for loop
    });   // should not stop playing tones

  });   // testing Sound Up Button

  describe('Sound Down Button', () => {
    it('should decrease lowTone by 1', () => {
      var toneArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      var toneResultArray = [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var offsetResultArray = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      for(var i = 0; i < toneArray.length; i++) {
        var spy = expect.createSpy();
        var formShephards = TestUtils.renderIntoDocument(
          <FormShephards playFrequency={spy}/>
        );
        formShephards.state.lowTone = toneArray[i];
        formShephards.state.arrayBase = 0;
        formShephards.state.isPlaying = false;
        TestUtils.Simulate.click(formShephards.refs.soundDown);
        expect(formShephards.state.lowTone).toEqual(toneResultArray[i]);
        expect(formShephards.state.arrayBase).toEqual(offsetResultArray[i]);
        expect(formShephards.state.isPlaying).toEqual(true);
        expect(spy).toHaveBeenCalled();
      }
    });   // should increase lowTone by 1

    it('should increase arrayBase by 1 on B->C', () => {
      var offsetArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var offsetResultArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

      for(var i = 0; i < offsetArray.length; i++) {
        var spy = expect.createSpy();
        var formShephards = TestUtils.renderIntoDocument(
          <FormShephards playFrequency={spy}/>
        );
        formShephards.state.lowTone = 0;
        formShephards.state.arrayBase = offsetArray[i];
        formShephards.state.isPlaying = false;
        TestUtils.Simulate.click(formShephards.refs.soundDown);
        expect(formShephards.state.lowTone).toEqual(11);
        expect(formShephards.state.arrayBase).toEqual(offsetResultArray[i]);
        expect(formShephards.state.isPlaying).toEqual(true);
        expect(spy).toHaveBeenCalled();
      }   // for loop
    });   // should decrease arrayBase by 1 on B->C

    it('should not stop playing tones', () => {
      var toneArray = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        0, 0, 0, 0, 0, 0, 0, 0, 0
      ];
      var offsetArray = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 2, 3, 4, 5, 6, 7, 8, 9
      ];

      for(var i = 0; i < toneArray.length; i++) {
        var spy = expect.createSpy();
        var formShephards = TestUtils.renderIntoDocument(
          <FormShephards playFrequency={spy}/>
        );
        formShephards.state.lowTone = toneArray[i];
        formShephards.state.arrayBase = offsetArray[i];
        formShephards.state.isPlaying = true;
        TestUtils.Simulate.click(formShephards.refs.soundDown);
        expect(formShephards.state.isPlaying).toEqual(true);
        expect(spy).toHaveBeenCalled();
      }   // for loop
    });   // should not stop playing tones

  });   // testing Sound Down Button

  describe('generateFrequencyArray function', () => {
    var spy = expect.createSpy();
    var formShephards = TestUtils.renderIntoDocument(
      <FormShephards playFrequency={spy}/>
    );
    it('should generate arrays for all pitches with no offsets', () => {
      var resultsArray = ([
        [
          16.35, 32.7, 65.4, 130.8, 261.6,
          523.2, 1046.4, 2092.8, 4185.6, 8371.2
        ], [
          17.32, 34.64, 69.28, 138.56, 277.12,
          554.24, 1108.48, 2216.96, 4433.92, 8867.84
        ], [
          18.35, 36.7, 73.4, 146.8, 293.6,
          587.2, 1174.4, 2348.8, 4697.6, 9395.2
        ], [
          19.45, 38.9, 77.8, 155.6, 311.2,
          622.4, 1244.8, 2489.6, 4979.2, 9958.4
        ], [
          20.6, 41.2, 82.4, 164.8, 329.6,
          659.2, 1318.4, 2636.8, 5273.6, 10547.2
        ], [
          21.83, 43.66, 87.32, 174.64, 349.28,
          698.56, 1397.12, 2794.24, 5588.48, 11176.96
        ], [
          23.12, 46.24, 92.48, 184.96, 369.92,
          739.84, 1479.68, 2959.36, 5918.72, 11837.44
        ], [
          24.5, 49, 98, 196, 392,
          784, 1568, 3136, 6272, 12544
        ], [
          25.96, 51.92, 103.84, 207.68, 415.36,
          830.72, 1661.44, 3322.88, 6645.76, 13291.52
        ], [
          27.5, 55, 110, 220, 440,
          880, 1760, 3520, 7040, 14080
        ], [
          29.14, 58.28, 116.56, 233.12, 466.24,
          932.48, 1864.96, 3729.92, 7459.84, 14919.68
        ], [
          30.87, 61.74, 123.48, 246.96, 493.92,
          987.84, 1975.68, 3951.36, 7902.72, 15805.44
        ]
      ]);

      for(var i = 0; i < resultsArray.length; i++) {
        var result = formShephards.generateFrequencyArray(
          formShephards.lowTones[i].frequency,  0
        );
        expect(result).toEqual(resultsArray[i]);
      }
    });     // should generate arrays for all pitches with no offsets
    it('should generate arrays for one pitch with all offsets', () => {
      var resultsArray = [
        [
          16.35, 32.7, 65.4, 130.8, 261.6,
          523.2, 1046.4, 2092.8, 4185.6, 8371.2
        ], [
          8371.2, 16.35, 32.7, 65.4, 130.8,
          261.6, 523.2, 1046.4, 2092.8, 4185.6,
        ], [
          4185.6, 8371.2, 16.35, 32.7, 65.4,
          130.8, 261.6, 523.2, 1046.4, 2092.8,
        ], [
          2092.8, 4185.6, 8371.2, 16.35, 32.7,
          65.4, 130.8, 261.6, 523.2, 1046.4,
        ], [
          1046.4, 2092.8, 4185.6, 8371.2, 16.35,
          32.7, 65.4, 130.8, 261.6, 523.2,
        ], [
          523.2, 1046.4, 2092.8, 4185.6, 8371.2,
          16.35, 32.7, 65.4, 130.8, 261.6,
        ], [
          261.6, 523.2, 1046.4, 2092.8, 4185.6,
          8371.2, 16.35, 32.7, 65.4, 130.8,
        ], [
          130.8, 261.6, 523.2, 1046.4, 2092.8,
          4185.6, 8371.2, 16.35, 32.7, 65.4,
        ], [
          65.4, 130.8, 261.6, 523.2, 1046.4,
          2092.8, 4185.6, 8371.2, 16.35, 32.7,
        ], [
          32.7, 65.4, 130.8, 261.6, 523.2,
          1046.4, 2092.8, 4185.6, 8371.2, 16.35
        ]
      ];

      for(var i = 0; i < resultsArray.length; i++) {
        var result = formShephards.generateFrequencyArray(
          formShephards.lowTones[0].frequency, i
        );
        expect(result).toEqual(resultsArray[i]);
      }

    });     // should generate arrays for one pitch with all offsets


  });   // generateFrequencyArray function


});
