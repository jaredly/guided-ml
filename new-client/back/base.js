
module.exports = Base

function Base() {
  this.cache = {
    plist: null,
    projects: {
    },
    data: {
    }
  }
}

Base.prototype = {
  // done(err, {feature: obj, data: {attrname: [val, val], ...}})
  createFeature: function (pid, name, type, args, done) {
    this._createFeature(name, type, args, function (err, obj) {
      if (err) return done(err, obj)
      var id = obj.feature.id
      this.cache.projects[pid].features[id] = obj.feature
      this.cache.data[pid].feature_data[id] = obj.data
      done(err, obj)
    }.bind(this))
  },
  getFeature: function (pid, id, done) {
    if (this.cache.projects[pid].features[id] &&
        this.cache.data[pid].feature_data[id]) {
      return done(null, {
        feature: this.cache.projects[pid].features[id],
        data: this.cache.data[pid].feature_data[id]
      })
    }
    this._getFeature(id, done)
  },
  listFeatures: function (id, done) {
    if (this.cache.projects[id]) {
      return done(null, this.cache.projects[id].features)
    }
    this._listFeatures(id, done)
  },
  listProjects: function (done) {
    if (this.cache.plist) return done(null, this.cache.plist)
    this._listProjects(done)
  },
  createProject: function (name, file, done) {
    this._createProject(name, file, function (err, obj) {
      if (err) return done(err, obj)
      var id = obj.project.id
      this.cache.projects[id] = obj.project
      this.cache.data[id] = {
        instances: obj.instances,
        feature_data: {},
        raw_data: [],
        results_list: [],
        results: {}
      }
      return done(err, obj)
    }.bind(this))
  },
  getInstances: function (id, done) {
    if (this.cache.data[id].instances) {
      return done(null, this.cache.data[id].instances)
    }
    this._getInstances(id, done)
  },
  getProject: function (id, done) {
    if (this.cache.projects[id]) {
      return done(null, this.cache.projects[id])
    }
    this._getProject(id, done)
  },

  getResultsList: function (id, done) {
    if (this.cache.data[id].results_list) {
      return done(null, this.cache.data[id].results_list)
    }
    this._getResultsList(id, done)
  },
  getResults: function (id, rid, done) {
    if (this.cache.data[id].results[rid]) {
      return done(null, this.cache.data[id].results[rid])
    }
    this._getResults(id, rid, done)
  },
  // done(err, {})
  _getProject: function (id, done) {
    throw 'override'
  },
  _getInstances: function (id, done) {
    throw 'override'
  },
  _createProject: function (name, file, done) {
    throw 'override'
  },
  _createFeature: function (name, type, args, done) {
    throw 'override'
  },
  _getFeature: function (pid, id, done) {
    throw 'override'
  },
  _listProjects: function (done) {
    throw 'override'
  }
}

