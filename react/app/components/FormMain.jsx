var React = require('react');
var {Link, IndexLink} = require('react-router');

var FormNav = require('FormNav');

// var FormMain = React.createClass({
//   getDefaultProps: function() {
//     return {
//       name: 'React'
//     };
//   },
//
//   getInitialState: function() {
//     return {
//       displayedForm: 0
//     };
//   },
//
//   getDisplayForm: function() {
//     var displayedForm = this.state.displayedForm;
//     switch(displayedForm) {
//       case 1:
//       return (
//         <div>
//           <FormNumberPad/>
//         </div>
//       );
//       break;
//       default:
//     };
//     return (
//       <div>
//         <FormFrequency/>
//       </div>
//     );
//   },
//
//   setForm: function(newState) {
//     alert("got here!")
//     // this.setState({
//     //   displayedForm: newState
//     // });
//   },
//
//   render: function() {
//     var name = this.props.name;
//     var formState = this.getDisplayForm();
//     return (
//       <div>
//         <p>Rendered FormMain</p>
//         <form>
//           <select onChange={this.setForm(0)}>
//             <option>One</option>
//             <option>Two</option>
//           </select>
//         </form>
//         <p>Name: {name}</p>
//         <div>
//           {formState}
//         </div>
//       </div>
//     );
//   }
// });

var FormMain = (props) => {
	return (
    <div>
      <FormNav/>
      <div>
        {props.children}
      </div>
    </div>
	)
};

module.exports = FormMain;
