
var sendFile = require('./send-file')

module.exports = TestDao

/**
 * Stores everything in memory
 */
function TestDao(delay) {
  this.delay = delay || 0;
  this.projects = {
    0: {
      name: 'Awesome Project',
      features: {
        1: {
          name: 'Thign',
          id: 1
        }
      },
      learners: {},
      classes: ['one', 'two']
    },
    5: {
      name: 'Mouse Gestures',
      features: {
        1: {
          name: 'Awesome',
          id: 1
        }
      },
      learners: {},
      classes: ['great', 'bad']
    }
  }
  this.nextids = {
    project: 6,
    feature: 6,
    learner: 6
  }
}

TestDao.prototype = {
  getFeatureOutput: function (pid) {
    var that = this
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (!that.projects[pid]) {
          return reject('Project not found')
        }
        var features = Object.keys(that.projects[pid].features).map(function (k) {
          return that.projects[pid].features[k]
        })
        features.sort(function (a, b) {
          return a.id - b.id
        })
        var data = {
          features: features,
          data: that.trainingData(pid),
          classes: that.projects[pid].classes
        }
        resolve(data)
      }, that.delay)
    })
  },
  /**
   * Make training data. [[id, class, feature1val, ...], ...]
   */
  trainingData: function (id) {
    var data = []
      , nf = Object.keys(this.projects[id].features).length
    for (var i=0; i<10; i++) {
      var row = [i, 'good']
      for (var j=0;j<nf;j++) {
        row.push(Math.random() * 20)
      }
      data.push(row)
    }
    return data
  },
  newId: function (type) {
    var id = this.nextids[type]
    this.nextids[type]+=1
    return id
  },
  newProject: function (name, file) {
    var id = this.newId('project')
    this.projects[id] = {
      learners: {},
      features: {},
      classes: []
    }
    setTimeout(function () {
      handlers.success.forEach(function (fn) {
        fn(JSON.stringify({"id": id}), null);
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
    var that = this
    var list = Object.keys(this.projects).map(function (id) {
      return {id: id, name: that.projects[id].name}
    })
    setTimeout(function () {
      cb(null, list);
    }, this.delay)
  },
  getProjectName: function (pid) {
    var that = this
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (!that.projects[pid]) return reject('Project not found')
        resolve(that.projects[pid].name)
      }, that.delay)
    })
  },
}

