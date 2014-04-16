
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
          type: 'sum_angles',
          args: {
            dim1: 'x',
            dim2: 'y'
          },
          id: 1
        }
      },
      learners: {},
      headers: ['x', 'y', 'z'],
      classes: ['one', 'two']
    },
    5: {
      name: 'Mouse Gestures',
      features: {
        1: {
          name: 'Awesome',
          type: 'sum_angles',
          args: {
            dim1: 'x',
            dim2: 'y'
          },
          id: 1
        },
        2: {
          name: 'Something',
          type: 'sum_angles',
          args: {
            dim1: 'x',
            dim2: 'y'
          },
          id: 2
        }
      },
      learners: {},
      headers: ['x', 'y', 'z', 'color'],
      classes: ['great', 'bad']
    }
  }
  this.nextids = {
    project: 6,
    feature: 6,
    learner: 6
  }
}

function choice(items) {
  return items[parseInt(Math.random() * items.length, 10)]
}

function merge(a, b) {
  for (var c in b) {
    a[c] = b[c]
  }
  return a
}

TestDao.prototype = {
  getFeatureOutput: function (pid) {
    var that = this
    return new Promise(function (resolve, reject) {
      if (resolve.resolve) {
        reject = resolve.reject.bind(resolve)
        resolve = resolve.resolve.bind(resolve)
      }
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
          headers: that.projects[pid].headers,
          classes: that.projects[pid].classes
        }
        resolve(data)
      }, that.delay)
    })
  },
  changeFeature: function (pid, fid, data) {
    return new Promise(function (res, rej)  {
      if (res.resolve) {
        rej = res.reject.bind(res)
        res = res.resolve.bind(res)
      }
      var col = []
      merge(this.projects[pid].features[fid], data)
      for (var i=0; i<10; i++) {
        col.push(Math.random() * 20)
      }
      res(col)
    }.bind(this))
  },
  /**
   * Make training data. [[id, class, feature1val, ...], ...]
   */
  trainingData: function (id) {
    var data = []
      , nf = Object.keys(this.projects[id].features).length
    for (var i=0; i<10; i++) {
      var row = [i, choice(this.projects[id].classes)]
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
      headers: [],
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
      if (resolve.resolve) {
        reject = resolve.reject.bind(resolve)
        resolve = resolve.resolve.bind(resolve)
      }
      setTimeout(function () {
        if (!that.projects[pid]) return reject('Project not found')
        resolve(that.projects[pid].name)
      }, that.delay)
    })
  },
}

