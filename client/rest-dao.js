
var sendFile = require('./send-file')
  , request = require('superagent-browserify')

module.exports = RestDAO

function RestDAO(host) {
  this.host = host || 'http://localhost:5000'
}

RestDAO.prototype = {
  del: function (dest, name) {
    var url = this.host + dest
      , sub = arguments.length === 2
    return new Promise(function (resolve, reject) {
      if (resolve.resolve) {
        reject = resolve.reject.bind(resolve)
        resolve = resolve.resolve.bind(resolve)
      }
      request.del(url)
        .end(function (err, res) {
          if (err) return reject(err)
          if (res.status > 299) return reject(res.text)
          resolve(sub ? res.body[name] : res.body)
        })
    })
  },
  get: function (dest, name) {
    var url = this.host + dest
      , sub = arguments.length === 2
    return new Promise(function (resolve, reject) {
      if (resolve.resolve) {
        reject = resolve.reject.bind(resolve)
        resolve = resolve.resolve.bind(resolve)
      }
      request.get(url)
        .end(function (err, res) {
          if (err) return reject(err)
          if (res.status !== 200) return reject(res.text)
          resolve(sub ? res.body[name] : res.body)
        })
    })
  },
  post: function (dest, data, name) {
    var url = this.host + dest
      , sub = arguments.length === 3
    return new Promise(function (resolve, reject) {
      if (resolve.resolve) {
        reject = resolve.reject.bind(resolve)
        resolve = resolve.resolve.bind(resolve)
      }
      request.post(url)
        .send(data)
        .end(function (err, res) {
          if (err) return reject(err)
          if (res.status !== 200) return reject(res.text)
          resolve(sub ? res.body[name] : res.body)
        })
    })
  },
  addLearner: function (pid, ltype, lname, args) {
    var data = {
      name: lname,
      type: ltype,
      args: args
    }
    return this.post('/project/' + pid + '/learner/new', data)
  },
  addFeature: function (pid, ftype, fname, args) {
    var data = {
      name: fname,
      type: ftype,
      args: args
    }
    return this.post('/project/' + pid + '/feature/new', data)
  },
  removeFeature: function (pid, fid) {
    return this.del('/project/' + pid + '/feature/' + fid)
  },
  getFeatureOutput: function (pid) {
    return this.get('/project/' + pid + '/feature/all')
  },
  getLearnerData: function (pid) {
    return this.get('/project/' + pid + '/learner/all')
  },
  changeFeature: function (pid, fid, data) {
    return this.post('/project/' + pid + '/feature/' + fid, data, 'feature_column')
  },
  newId: function (type) {
  },
  newProject: function (name, file) {
    return sendFile(this.host + '/project/new', 'file', file, {name: name})
  },
  listProjects: function (cb) {
    request.get(this.host + '/project/')
      .end(function (err, res) {
        cb(err, res && res.body && res.body.names)
      })
  },
  getProjectName: function (pid) {
    return this.get('/project/' + pid + '/name', 'name')
  }
}

