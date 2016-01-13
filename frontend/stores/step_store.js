var _steps = {};
var _callbacks = [];

var TodoStepStore = {

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

  all: function(todoId) {
    return _steps[todoId];
  },

  fetch: function(todoId) {
    $.get('/api/todos/' + todoId + '/todo_steps', {}, function(theseSteps){
      _steps[todoId] = theseSteps;
      TodoStepStore.changed();
    });
  },

  create: function(stepToPostToServer, todoId) {
    $.post('/api/todos/' + todoId + '/todo_steps', stepToPostToServer, function(thisStep) {
      _steps[todoId].push(thisStep);
      TodoStepStore.changed();
    });
  },

  destroy: function(stepId, todoId) {
    var stepIdx;
    var thisTodoStep = _steps[todoId].find(function(step, idx){
      stepIdx = idx;
      return step.id === stepId;
    });

    if (thisTodoStep) {
      $.ajax({
        url: 'api/todo_steps/' + thisTodoStep.id,
        type: 'DELETE',
        success: function() {
          _steps[todoId].splice(stepIdx,1);
          console.log('successfully deleted');
          TodoStepStore.changed();
        },
        failure: function() {console.log('error in delete');},
      });
    }
  },

  toggleDone: function(stepId, todoId){
    var stepIdx;
    var thisTodoStep = _steps[todoId].find(function(step, idx){
      stepIdx = idx;
      return step.id === stepId;
    });

    if (thisTodoStep) {
      $.ajax({
        url: 'api/todo_steps/' + thisTodoStep.id,
        type: 'PATCH',
        data: {todo_step: {done: !thisTodoStep.done}},
        success: function() {
          console.log('successfully edited');
          thisTodoStep.done = !thisTodoStep.done;
          TodoStepStore.changed();
        },
        failure: function() {console.log('error in editing');},
      });
    }
  }
};

module.exports = TodoStepStore;
