
var sendFile = require('./send-file')

module.exports = TestDao

function TestDao(delay) {
  this.delay = delay || 0;
}

TestDao.prototype = {
  newProject: function (name, file) {
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

