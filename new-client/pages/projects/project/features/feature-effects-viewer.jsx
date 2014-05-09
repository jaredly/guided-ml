/** @jsx React.DOM */

var BarGraph = require('./bar-graph.jsx')

function binByClass(classes, data, info, opt) {
  var byclass = {}
    , max = Math.max.apply(Math, data)
    , min = Math.min.apply(Math, data)
    , range = max - min
    , bins = opt.bins
    , assignments = {}
    , labels = []
  if (opt.isInteger && range > opt.minbins && range < opt.maxbins) {
    bins = range
  }
  var scale = range / bins
  for (var i=0; i<bins; i++) {
    labels.push(parseInt(100 * (min + (i)*scale))/100 + ' - ' + parseInt(100 * (min + (i+1)*scale))/100)
  }
  classes.forEach(function (cls) {
    var l = []
      , a = []
    for (var i=0; i<bins; i++) {
      l.push(0)
      a.push([])
    }
    byclass[cls] = l
    assignments[cls] = a
  })
  var val
  for (var i=0; i<data.length; i++) {
    val = parseInt((data[i] - min) / scale)
    if (val >= bins) val = bins - 1
    byclass[info[i].vclass][val] += 1
    assignments[info[i].vclass][val].push(i)
  }
  return {bins: byclass, labels: labels, assignments: assignments}
}

var FeatureEffectsViewer = module.exports = React.createClass({
  displayName: 'FeatureEffectsViewer',
  getDefaultProps: function () {
    return {
      onSelect: function (which, vclass, num, i) {console.log('select', which, vclass, num, i)},
      instance_info: [],
      classes: [],
      data: []
      /*
      */
    }
  },
  render: function () {
    var binned = binByClass(this.props.classes, this.props.data, this.props.instance_info, {bins: 20, isInteger: false})
      , onSelect = this.props.onSelect
    console.log('sorted', binned)
    return (
      <div className='feature-effects'>
        These are the effects of our features
        {
          this.props.classes.map(function (vclass) {
            var bin = binned.bins[vclass]
            return (
              <BarGraph
                key={vclass}
                onSelect={function (num, i) {
                  onSelect(binned.assignments[vclass][i], vclass, num, i)
                }}
                data={bin}
                labels={binned.labels}/>
            )
          })
        }
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

