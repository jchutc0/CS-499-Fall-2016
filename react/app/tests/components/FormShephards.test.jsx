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
    var toneLength = formShephards.lowTones.length;
    it('should generate 12 tones', () => {
      expect(toneLength).toEqual(12);
    });     // should generate 12 tones

    var numberOfSamples = formShephards.numberOfSamples;
    it('should generate 10 samples', () => {
      expect(numberOfSamples).toEqual(10);
    });     // should generate 10 samples

    it('should generate 10 tones for each frequency', () => {
      for(var i = 0; i < toneLength; i++) {
        var testFrequency = formShephards.lowTones[i].frequency;
        for(var j = 0; j < numberOfSamples; j++) {
          var result = formShephards.generateFrequencyArray(i, j);
          expect(result.length).toEqual(10);
        }   // j loop
      }     // i loop
    });     // should generate 10 tones for each frequency

    it('should have the correct low frequency for each pitch', () => {
      for(var i = 0; i < toneLength; i++) {
        var testFrequency = formShephards.lowTones[i].frequency;
        for(var j = 0; j < numberOfSamples; j++) {
          var result = formShephards.generateFrequencyArray(i, j);
          expect(result[j]).toEqual(testFrequency);
        }   // j loop
      }     // i loop
    });     // should have the correct low frequency for each pitch

    it('should have increasing values doubling', () => {
      for(var i = 0; i < toneLength; i++) {
        var testFrequency = formShephards.lowTones[i].frequency;
        for(var j = 0; j < numberOfSamples; j++) {
          var result = formShephards.generateFrequencyArray(i, j);
          for(var k = 0; k < j - 1; k++) {
            expect(result[k + 1]).toEqual(result[k] * 2);
          }
          for(var k = j; k < numberOfSamples - 1; k++) {
            expect(result[k + 1]).toEqual(result[k] * 2);
          }
          if(j != 0) {
            expect(result[0]).toEqual(result[numberOfSamples - 1] * 2);
          }
        }   // j loop
      }     // i loop
    });     // should have the correct low frequency for each pitch
  });   // generateFrequencyArray function

  describe('generateGainArray function', () => {
    var spy = expect.createSpy();
    var formShephards = TestUtils.renderIntoDocument(
      <FormShephards playFrequency={spy}/>
    );

    var toneLength = formShephards.lowTones.length;
    it('should generate 12 tones', () => {
      expect(toneLength).toEqual(12);
    });     // should generate 12 tones

    var numberOfSamples = formShephards.numberOfSamples;
    it('should generate 10 samples', () => {
      expect(numberOfSamples).toEqual(10);
    });     // should generate 10 samples

    it('should generate length 10 sample arrays', () => {
      for(var i = 0; i < toneLength; i++) {
        for(var j = 0; j < numberOfSamples; j++) {
          var frequencyArray = formShephards.generateFrequencyArray(i, j);
          var result = formShephards.generateGainArray(frequencyArray);
          expect (result.length).toEqual(10);
        }   // j loop
      }     // i loop
    });     // should generate 10 sample arrays

    it('should generate arrays increasing up to 440Hz then decreasing', () => {
      for(var i = 0; i < toneLength; i++) {
        for(var j = 0; j < numberOfSamples; j++) {
          var frequencyArray = formShephards.generateFrequencyArray(i, j);
          var result = formShephards.generateGainArray(frequencyArray);
          for(var k = 0; k < numberOfSamples - 1; k++) {
            if(
              (frequencyArray[k] < 440) &&
              (frequencyArray[k+1] <= 440)
            ) {
              expect(result[k] < result[k+1]).toBe(true);
            } else if (
              (frequencyArray[k] >= 440) &&
              (frequencyArray[k+1] > 440)
            ) {
              expect(result[k] > result[k+1]).toBe(true);
            }
          } // k loop
        }   // j loop
      }     // i loop
    });     // should generate 10 sample arrays

  });       // generateGainArray function describe block

  describe('toggleSound button', () => {
    var spy = expect.createSpy();
    var formShephards = TestUtils.renderIntoDocument(
      <FormShephards playFrequency={spy}/>
    );

    it('should toggle isPlaying from false to true', () => {
      formShephards.state.lowTone = 0;
      formShephards.state.arrayBase = 0;
      formShephards.state.isPlaying = false;
      TestUtils.Simulate.click(formShephards.refs.toggleSound);
      expect(formShephards.state.isPlaying).toBe(true);
    });       // should toggle isPlaying from false to true

    it('should toggle isPlaying from true to false', () => {
      formShephards.state.lowTone = 0;
      formShephards.state.arrayBase = 0;
      formShephards.state.isPlaying = true;
      TestUtils.Simulate.click(formShephards.refs.toggleSound);
      expect(formShephards.state.isPlaying).toBe(false);
    });
  });       // toggleSound button describe block

  describe('playShephards function', () => {
    it('should send empty sound if !isPlaying', () => {
      var spy = expect.createSpy();
      var formShephards = TestUtils.renderIntoDocument(
        <FormShephards playFrequency={spy}/>
      );
      formShephards.playShephards(0, 0, false);
      expect(spy).toHaveBeenCalledWith([], []);
    });       // should send empty sound if !isPlaying

    it('should call playFrequency with correct values if isPlaying', () => {
      var maxi = 12;
      var maxj = 10;
      for(var i = 0; i < maxi; i++) {
        for(var j = 0; j < maxj; j++) {
          var spy = expect.createSpy();
          var formShephards = TestUtils.renderIntoDocument(
            <FormShephards playFrequency={spy}/>
          );
          var frequencyArray = formShephards.generateFrequencyArray(i, j);
          var gainArray = formShephards.generateGainArray(frequencyArray);
          var toneLength = formShephards.lowTones.length;
          expect(toneLength).toEqual(maxi);
          var numberOfSamples = formShephards.numberOfSamples;
          expect(numberOfSamples).toEqual(maxj);
          formShephards.playShephards(i, j, true);
          expect(spy).toHaveBeenCalledWith(frequencyArray, gainArray);
        }   // j loop
      }     // i loop
    });     // should call playFrequency with correct values if isPlaying
  });       // playShephards function describe block

});
