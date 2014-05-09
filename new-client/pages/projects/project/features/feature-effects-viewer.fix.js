
module.exports = function () {
  var classes = ['red', 'green', 'blue']
    , num = 300
  return {
    first: {
      instance_info: make_instance_info(num, classes),
      data: make_data(num),
      classes: classes
    }
  }
}

function make_data(num, min, max, asInt) {
  if (arguments.length === 2) {
    max = min
    min = 0
  }
  if (arguments.length === 1) {
    min = 0
    max = 10
  }
  var data = []
    , range = max - min
    , v
  for (var i=0; i<num; i++) {
    v = Math.random() * range + min
    if (asInt) v = parseInt(v, 10)
    data.push(v)
  }
  return data
}

function choice(options) {
  return options[parseInt(Math.random() * options.length)]
}

function make_instance_info(num, classes) {
  var data = []
  for (var i=0; i<num; i++) {
    data.push({
      vclass: choice(classes),
      has_img: false,
      has_vid: false,
      meta: {
        stuff: 'image ' + i
      }
    })
  }
  return data
}

