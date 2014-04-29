
module.exports = Base

function Base() {
  this.cache = {}
}

Base.prototype = {
  // done(err, {feature: obj, data: {attrname: [val, val], ...}})
  createFeature: function (name, type, args, done) {
    this._createFeature(name, type, args, function (err, obj) {
      if (err) return done(err, obj)
      var id = obj.feature.id
      this.cache.features[id] = obj
      done(err, obj)
    })
  },
  getFeature: function (id, done) {
    if (this.cache.features[id]) return done(null, this.cache.features[id])
    this._getFeature(id, done)
  },
  // done(err, {})
  _createProject: function (name, file, done) {
    throw 'override'
  },
  _createFeature: function (name, type, args, done) {
    throw 'override'
  }
}

