var React = require('react');
var ReactDOM = require('react-dom');
var TodoStepList = require('./todo_step_list');

var TodoDetailView = React.createClass ({

  render: function() {

    return(
    <div>
      <div>Body: {this.props.todo.body}</div>
      <div>Steps: <TodoStepList todo={this.props.todo}/></div>
      <button value={this.props.todo.id} onClick={this.handleDestroy}>
        Delete
      </button>
    </div>
    );
  }


});

module.exports = TodoDetailView;
