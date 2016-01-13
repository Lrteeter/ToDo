var React = require('react');
var ReactDom = require('react-dom');
var TodoStore = require('../stores/todo_store');

var DoneButton = React.createClass ({
  handleDone: function(e) {
    TodoStore.toggleDone(parseInt(e.target.value));
  },

  render: function() {
    var buttonText;
    if (this.props.todo.done) {
      buttonText = "Undo";
    } else {
      buttonText = "Done";
    }

    return(
      <div>
        <button
          value={this.props.todo.id}
          onClick={this.handleDone}>
            {buttonText}
        </button>
      </div>
    );
  }

});

module.exports = DoneButton;
