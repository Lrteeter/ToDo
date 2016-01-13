var React = require('react');
var ReactDOM = require('react-dom');
var TodoStore = require('../stores/todo_store');
var DoneButton = require('./done_button');
var TodoDetailView = require('./todo_detail_view');

var TodoListItem = React.createClass ({
  getInitialState: function() {
    return {showDetails: false};
  },

  handleDestroy: function(e) {
    TodoStore.destroy(parseInt(e.target.value));
  },

  handleDetail: function(e) {
    this.setState({showDetails: !this.state.showDetails});
  },

  render: function() {

    return(
      <div>
        <div onClick={this.handleDetail}>Title: {this.props.todo.title}</div>
        <div>
          {this.state.showDetails ? <TodoDetailView todo={this.props.todo}/> : null}
        </div>
        <DoneButton todo={this.props.todo}/>
        <br/><br/>
      </div>
    );
  }

});

module.exports = TodoListItem;
