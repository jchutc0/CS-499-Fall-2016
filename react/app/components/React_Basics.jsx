/*

The purpose of this class is to show a React class in action and explain some
of the basics of the framework.

The major required components of the class are:
1 - Requiring the React variable to get the React functionality
2 - Creating the class as a variable with React.createClass()
	- React.createClass() requires a parameter that is an object
		- one element of that object MUST be a function that maps to render
		- the render function is called when the class is initialized
		- the return value of render is sent to the browser to display
		- as a convention, I've been putting render as the last element in the
      class so I know where to find it
3 - Exporting the class by setting module.exports

A very basic React class could be:

----------
var React = require('react');

var React_Basics = React.createClass({
  render: function() {
    return "";
  }
});

module.exports = React_Basics;
----------
XML

Since React uses .jsx files, when you're sending information around, you can
use XML tags to enclose things instead of quotation marks. That's a part of the
reason there are so many division (<div>) tags in the code. To illustrate why
this is helpful, compare:

  <a href="http://www.uky.edu">UK</a>

...to:

"<a href=\"http://www.uky.edu\">UK</a>"

One thing to note is that when you're using this, you need to make sure that
you're only using one XML tag. Just like "one" "two" is not a single string,
neither is:

<a href="http://www.uky.edu">UK</a>
<a href="http://slashdot.org">Slashdot</a>

...which is why I use the <div> tags, since this IS a single XML element:

<div>
  <a href="http://www.uky.edu">UK</a>
  <a href="http://slashdot.org">Slashdot</a>
</div>

XML requires all tags to have an opening and a closing tag. To use a tag that
does not need this, (for instance a <br>), just put a slash before the closing
bracket. So, <br></br> can be done with <br/>

----------
Data

React classes have two major kinds of ways of holding data: props (properties)
and state.

Props are like parameters to a function -- the React class gets them from
somewhere else and can use them but not modify them. They're very helpful for
sending info from the class that calls the current class to the current class.
Also note that for data to flow back up to a calling class, a function from the
calling class can be passed as a prop.

Props are accessed by this.props.propName. Default values for the props can be
set by defining the getDefaultProps() function to return an object. The object
is a set of names mapped to the prop value. A simple example is:

getDefaultProps: function() {
  return {
    message: 'This is the default message.'
  };
}

State is like an internal variable to the class that stays constant as long as
the class exists, so in our case, until the browser reloads. It's helpful for
maintaining internal state. For instance, if our frequency form needs to
display either "Play" or "Pause" as a buton depending on whether the sound is
playing, this can be stored in state. The state is accessed by
this.state.stateValueName. The initial state is set by defining the
getInitialState() function to return a stateObject the same way
getDefaultProps() works. To update the state, use this.setState(stateObject).
For both of those, the stateObject is an object with a set of names mapped to
the state. A simple example of using setState from Main:

this.setState({
  userMessage: 'Last number pressed was: ' + numPressed
});


*/

// Require the React framework
var React = require('react');

// Declare the React_Basics class with default props, an initial state, an
//  internal function to update a state variable, and a render function to
//  display things. To require that certain parameters be passed, we could also
//  have used propTypes -- see FormMain.jsx for an example
var React_Basics = React.createClass({
  /****
  getDefaultProps
  Takes: nothing
  Sets the default property values if the values are not passed in, so if the
    class is rendered with <React_Basics/>, we'd have {foo: 1, bar:2}, but if
    the class is rendered with <React_Basics foo=3/>, we'd have
    {foo: 3, bar:2}. Foo would be accessed by this.props.foo.
  ****/
  getDefaultProps: function() {
    return {
      foo: 1,
      bar: 2
    };  // return object
  },    // getDefaultProps function

  /****
  getDefaultProps
  Takes: nothing
  Sets the inital state values. Running would be accessed by
  this.state.running.
  ****/
  getInitialState: function() {
    return {
      running: false,
      weather: 'frightful'
    };  // return object
  },    // getInitialState function

  /****
  setRunning
  Takes: runningState parameter
  Uses setState to update the running value, does not affect weather value.
  Note, since this uses setState, it is NOT to be used in the render function.
  We'd probably set it up as part of a button or another function.
  ****/
  setRunning: function(runningState) {
    var blag = 7;    // look! you can make internal variables too!
    this.setState({
      running: runningState
    });     // this.setState object
  },        // setRunning function

  /*
  render
  Takes: nothing
  Function React uses to render the component to the browser
  */
  render: function() {
    return (
      <div>
        {this.props.foo}
        {this.state.running}
      </div>
    );  // return XML
  }     // render function
});     // React_Basics component

// exports the component for use by other classes
module.exports = React_Basics;
