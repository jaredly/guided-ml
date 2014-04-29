
var bulk = require('bulk-require')
  , plugins = bulk(__dirname, '../plugins/learners/*/index.js')
  , learners = {}

function register(name, title, args, doc) {
  learners[name] = {
    title: title,
    args: args,
    name: name,
    doc: doc
  }
}

for (var name in plugins) {
  plugins[name](register)
}

module.exports = learners

