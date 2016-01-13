var _todos = [];
var _callbacks = [];

var TodoStore = {

  changed: function() {
    _callbacks.forEach(function(callback){
      callback();
    });
  },

  addChangedHandler: function(callback) {
    _callbacks.push(callback);
  },

  removeChangeHandler: function(callback) {
    var idx = _callbacks.indexOf(callback);
    if (!idx) { return; }
    _callbacks.splice(idx, 1);
  },

  all: function() {
    return _todos.slice();
  },

  fetch: function() {
    $.get('api/todos', {}, function(todos){
      _todos = todos;
      TodoStore.changed();
    });
  },

  create: function(todoToPostToServer) {
    $.post('api/todos', todoToPostToServer, function(todo) {
      _todos.push(todo);
      TodoStore.changed();
    });
  },

  destroy: function(id) {
    var todoIdx;
    var thisTodo = _todos.find(function(todo, idx){
      todoIdx = idx;
      return todo.id === id;
    });

    if (thisTodo) {
      $.ajax({
        url: 'api/todos/' + thisTodo.id,
        type: 'DELETE',
        success: function() {
          _todos.splice(todoIdx,1);
          console.log('successfully deleted');
          TodoStore.changed();
        },
        failure: function() {console.log('error in delete');},
      });
    }
  },

  toggleDone: function(id){
    var todoIdx;
    var thisTodo = _todos.find(function(todo, idx){
      todoIdx = idx;
      return todo.id === id;
    });

    if (thisTodo) {
      $.ajax({
        url: 'api/todos/' + thisTodo.id,
        type: 'PATCH',
        data: {todo: {done: !thisTodo.done}},
        success: function() {
          console.log('successfully edited');
          thisTodo.done = !thisTodo.done;
          TodoStore.changed();
        },
        failure: function() {console.log('error in editing');},
      });
    }
  }
};

module.exports = TodoStore;
