
var _ = require('lodash')
  , Base = require('./base')

module.exports = TestBack

TestBack.prototype = Object.create(Base.prototype)
function TestBack() {
  this.data = {
  }
  this.nids = {
    features: 100,
    projects: 100
  }
  Base.call(this)
  this.createProject('One Project', {}, function () {})
}

_.extend(TestBack.prototype, {
  nid: function (type) {
    var id = this.nids[type]
    this.nids[type]+=1
    return id + ''
  },
  _listFeatures: function (id, done) {
    done(null, this.data[id].features)
  },
  _listProjects: function (done) {
    var data = this.data
    done(null, Object.keys(this.data).map(function (id) {
      return {id: id, name: data[id].name}
    }))
  },
  _getInstances: function (id, done) {
    done(null, [
      {img: true, vclass: 'party'},
      {img: true, vclass: 'lots'},
      {img: true, vclass: 'lots'},
      {img: true, vclass: 'party'},
      {img: true, vclass: 'party'},
      {img: true, vclass: 'lots'},
      {img: true, vclass: 'lots'},
      {img: true, vclass: 'lots'},
      {img: true, vclass: 'party'},
      {img: true, vclass: 'party'},
      {img: true, vclass: 'lots'},
      {img: true, vclass: 'lots'},
    ])
  },
  _createProject: function (name, file, done) {
    var id = this.nid('projects')
    var project = {
      id: id,
      name: name,
      filename: 'some-awesome.zip',
      features: [],
      reducers: [],
      learners: [],
      classes: ['party', 'lots'],
      headers: ['x', 'y', 'z']
    }
    this.data[id] = project
    done(null, {
      project: project,
      instances: [
        {img: true, vclass: 'party'},
        {img: true, vclass: 'lots'},
        {img: true, vclass: 'lots'},
        {img: true, vclass: 'party'},
        {img: true, vclass: 'party'},
        {img: true, vclass: 'lots'},
        {img: true, vclass: 'lots'},
        {img: true, vclass: 'lots'},
        {img: true, vclass: 'party'},
        {img: true, vclass: 'party'},
        {img: true, vclass: 'lots'},
        {img: true, vclass: 'lots'},
      ]
    })
  },
  _getProject: function (id, done) {
    done(null, this.data[id])
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

