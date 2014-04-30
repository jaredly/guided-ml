
var _ = require('lodash')
  , Base = require('./base')

module.exports = TestBack

TestBack.prototype = Object.create(Base.prototype)
function TestBack() {
  this.data = {
  }
  this.nids = {
    features: 100,
  }
}

_.extend(TestBack.prototype, {
  nid: function (type) {
    var id = this.nids[type]
    this.nids[type]+=1
    return id
  },
  _createFeature: function (pid, name, type, args, done) {
    var id = this.nid('features')
    var feature = this.data[pid].features[id] = {
      id: id,
      name: name,
      type: type,
      args: args
    }
    done(null, {
      feature: feature,
      data: {
        'One Awesome Feature': [1,2,3,2,1,2,3,0,0,0,10,16],
        'Another Feature':     [10,2,3,54,3,4,2,2,3,3,4,12]
      }
    })
  },
  _getFeature: function (pid, id, done) {
    done(null, {
      feature: this.data[pid].features[id],
      data: {
        'One Awesome Feature': [1,2,3,2,1,2,3,0,0,0,10,16],
        'Another Feature':     [10,2,3,54,3,4,2,2,3,3,4,12]
      }
    })
  },
})

