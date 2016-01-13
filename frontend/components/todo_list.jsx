var React = require('react');
var ReactDOM = require('react-dom');
var TodoStore = require('../stores/todo_store.js');
var TodoListItem = require('./todo_list_item');
var TodoForm = require('./todo_form');

var TodoList = React.createClass({
  getInitialState: function() {
    return{list: TodoStore.all()};
  },
  componentDidMount: function() {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeHandler(this.todosChanged);
  },

  todosChanged: function() {
    this.setState({list: TodoStore.all()});
  },
  render: function() {
    var htmlList = [];
    this.state.list.forEach(function(todo){
      htmlList.push(<TodoListItem key={todo.id} todo={todo}/>);
    });

    return(
      <div>
        {htmlList}
        <br/>
        <hr/>
        <br/>
        <TodoForm/>
      </div>
    );
  }
});

module.exports = TodoList;
