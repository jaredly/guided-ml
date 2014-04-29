
var bulk = require('bulk-require')
  , plugins = bulk(__dirname, '../plugins/features/*/index.js')
  , features = {}

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

