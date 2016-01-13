var React = require('react');
var ReactDOM = require('react-dom');
var TodoStore = require('../stores/todo_store') ;

var TodoForm = React.createClass({
  getInitialState: function() {
    return({title: "", body: ""});
  },

  updateTitle: function(e) {
    // debugger
    this.setState({title: e.target.value});
  },

  updateBody: function(e) {
    this.setState({body: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var newTodo = {
      title: this.state.title,
      body: this.state.body,
      done: false
    };

    TodoStore.create({todo: newTodo});

    //clear form
    this.setState({
      title: "",
      body: ""
    });
  },

  render: function() {
    return(
      <form onSubmit={this.handleSubmit}>
        Title: <input type="text"
                      value={this.state.title}
                      onChange={this.updateTitle}/>
        <br/>
        Body: <input type="text"
                     value={this.state.body}
                     onChange={this.updateBody}/>
        <br/><br/>
        <input type="submit" value="New Todo List Item"/>
      </form>
    );
  }
});


module.exports = TodoForm;
