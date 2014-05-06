
var bulk = require('bulk-require')
var tree = bulk(__dirname, '../plugins/features/*/index.js')
  , features = {}
  , plugins = tree['..'].plugins.features

function register(obj) {
  features[obj.name] = {
    description: obj.description,
    title: obj.title,
    args: obj.args,
    name: obj.name,
    widget: obj.widget || null
  }
}

for (var name in plugins) {
  plugins[name](register)
}

module.exports = features

