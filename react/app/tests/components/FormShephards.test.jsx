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
  - test all 12 (0-11) lowTone
  - Create a generateGainArray function to get a testable gain
    - values < 440 go up, values > 440 go down
  - Create a generateFrequencyArray function to get testable frequency
    - element n+1 = 2* element n (10 tones)
  - spy on this.props.playFrequency(frequencyArray, gainArray) for values

  okay... better for testing stuff - just set the state in the handleSoundUp
  and handleSoundDown and handleStopSound buttons and play or don't play based
  on play state in componentWillUpdate(nextProps, nextState) function
  after that, set state for all 12 tones and test moving up
  then, set state for all 12 tones and test moving down
  then go B->C up for all 10 arrayBase elements and make sure they loop
  then go C->B down for all 10 arrayBase elements and make sure they loop

  doing it this way, playShephards is the only thing generating tones and that
  can be done setting the state -- everything else just sets the state
  Going to have to add an isPlaying state variable

  playShephards should call the spy with [],[] if !isPlaying
  otherwise, freq = generateFrequencyArray gain = generateGainArray and calls
  with freq, gain -- test all 12 tones in all 10 base positions :P


  */

});
