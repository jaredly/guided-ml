
var bulk = require('bulk-require')
var tree = bulk(__dirname, '../plugins/features/*/index.js')
  , features = {}
  , plugins = tree['..'].plugins.features

function register(name, title, args, doc) {
  features[name] = {
    title: title,
    args: args,
    name: name,
    doc: doc
  }
}

for (var name in plugins) {
  plugins[name](register)
}

module.exports = features

