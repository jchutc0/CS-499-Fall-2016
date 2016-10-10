var React = require('react');
var FormFrequency = require('FormFrequency');
var FormNumberPad = require('FormNumberPad');

var FormMain = (props) => {
  return (
    <div>
      <p>Rendered FormMain</p>
      <div>
        <FormFrequency/>
        <FormNumberPad/>
      </div>
    </div>
  );
};

module.exports = FormMain;
