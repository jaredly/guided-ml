
var FEATURES = require('./features-raw.json')

module.exports = {
  FEATURES: FEATURES,
  defaultVal: defaultVal,
  defaultArgs: defaultArgs
}

function defaultVal(arg, headers) {
  if ('string' === typeof arg) {
    arg = {type: arg}
  }
  if (arg.default !== undefined) return arg.default
  if (arg.type === 'dim') return headers[0]
  if (arg.min) return arg.min
  if (arg.max) return arg.max
  return 404
}

function defaultArgs(ftype, headers) {
  var args = {}
  for (var name in FEATURES[ftype].args) {
    args[name] = defaultVal(FEATURES[ftype].args[name], headers)
  }
  return args
}

