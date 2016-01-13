var React = require('react');
var ReactDOM = require('react-dom');
var TodoList = require('./components/todo_list');

window.TodoStore = require('./stores/todo_store');
window.TodoStepStore = require('./stores/step_store');

ReactDOM.render( <TodoList/>, document.getElementById('root'));
