
var sendFile = require('./send-file')

module.exports = TestDao

function TestDao(delay) {
  this.delay = delay || 0;
}

TestDao.prototype = {
  newProject: function (name, file) {
    setTimeout(function () {
      handlers.success.forEach(function (fn) {
        fn('{"id": 25}', null);
      });
    }, this.delay);
    var handlers = {
      abort: [],
      progress: [],
      error: [],
      success: []
    }
    var chain = {
      on: function (evt, func) {
        handlers[evt].push(func)
        return chain;
      }
    }
    return chain;
  },
  listProjects: function (cb) {
    setTimeout(function () {
      cb(null, [
        {id: 0, name: 'Awesome Project'},
        {id: 5, name: 'Mouse Gestures'}
      ]);
    }, this.delay)
  }
}

