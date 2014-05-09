
module.exports = Model

function Projects(baseurl) {
  this._url = baseurl
}

Projects.prototype = {
  list: function () {
  },
  get: function () {
  },
}

function Project(data, update) {
  this.data = data
  this.onupdate = update
}

