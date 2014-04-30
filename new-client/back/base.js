
module.exports = Base

function Base() {
  this.cache = {
    projects: {},
    plist: null
  }
}

Base.prototype = {
  // done(err, {feature: obj, data: {attrname: [val, val], ...}})
  createFeature: function (pid, name, type, args, done) {
    this._createFeature(name, type, args, function (err, obj) {
      if (err) return done(err, obj)
      var id = obj.feature.id
      this.cache.projects[pid].features[id] = obj
      done(err, obj)
    })
  },
  getFeature: function (pid, id, done) {
    if (this.cache.projects[pid].features[id]) {
      return done(null, this.cache.projects[pid].features[id])
    }
    this._getFeature(id, done)
  },
  listProjects: function (done) {
    if (this.cache.plist) return done(null, this.cache.plist)
    this._listProjects(done)
  },
  // done(err, {})
  _createProject: function (name, file, done) {
    throw 'override'
  },
  _createFeature: function (name, type, args, done) {
    throw 'override'
  },
  _listProjects: function (done) {
    throw 'override'
  }
}

