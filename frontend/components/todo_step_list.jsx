var React = require('react');
var ReactDOM = require('react-dom');
var TodoStepStore = require('../stores/todo_store');

var TodoStepList = React.createClass({
  getInitialState: function() {
    // console.log(TodoStepStore.all(this.props.todo.id));
    return{list: TodoStepStore.all(this.props.todo.id)};
  },
  componentDidMount: function() {
    TodoStepStore.addChangedHandler(this.todoStepsChanged);
    TodoStepStore.fetch(this.props.todo.id);
  },

  componentWillUnmount: function() {
    TodoStepStore.removeChangeHandler(this.todoStepsChanged);
  },

  todoStepsChanged: function() {
    this.setState({list: TodoStepStore.all(this.props.todo.id)});
  },
  render: function() {
    var htmlList = [];
    // console.log(this.state.list);
    this.state.list.forEach(function(todoStep){
      if (todoStep.id === this.props.todo.id){
        htmlList.push(<li key={todoStep.id}>{todoStep.body}</li>);
      }
    }.bind(this));

    return(
      <div>
        {htmlList}
        <button>Delete</button>
      </div>
    );
  }
});

module.exports = TodoStepList;
