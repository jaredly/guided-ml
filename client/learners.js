
var LEARNERS = require('./learners-raw.json')

module.exports = {
  LEARNERS: LEARNERS,
  defaultVal: defaultVal,
  defaultArgs: defaultArgs
}

function defaultVal(arg) {
  if ('string' === typeof arg) {
    arg = {type: arg}
  }
  if (arg.default !== undefined) return arg.default
  if (arg.min) return arg.min
  if (arg.max) return arg.max
  return 404
}

function defaultArgs(ftype) {
  var args = {}
  for (var name in LEARNERS[ftype].args) {
    args[name] = defaultVal(LEARNERS[ftype].args[name])
  }
  return args
}

