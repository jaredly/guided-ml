
var FEATURES = require('../features').FEATURES

var FeatureTable = module.exports = React.createClass({
  displayName: 'FeatureTable',
  getDefaultProps: function () {
    return {
      data: null,
      sorting: 1,
      selected: null,
      toggleEditing: function () {throw 'fail'},
      addFeature: function (){throw 'override'},
      sortBy: function () {throw 'override'},
      classes: [],
      features: []
    }
  },
  sortBy: function (i, e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.sortBy(i)
  },
  sorter: function (i) {
    var cls = ''
      , sorting = i+1 === this.props.sorting
      , by = i+1
      , down = true
    if (sorting) {
      cls = ' sorting sorting-down'
      by = -by
    } else if (i+1 === -this.props.sorting) {
      cls = ' sorting sorting-up'
      down = false
    }
    return (
      <span className={"sorter" + cls}
          onClick={this.sortBy.bind(null, by)}>
          {down ? 'v' : '^'}
      </span>
    )
  },
  featureHeader: function (feature, i) {
    var hcls = ''
    if (feature.id === this.props.selected) {
      hcls += ' selected'
    }
    return (
      <td key={feature.id}
          className={'feature-head' + hcls}
          onClick={this.props.toggleEditing.bind(null, feature.id)}>
        {feature.name}
        {this.sorter(i + 2)}
      </td>
    )
  },
  getIndices: function () {
    var indices = []
      , sorting = this.props.sorting
      , data = this.props.data
    for (var i=0; i<data.length; i++) {
      indices.push(i)
    }
    if (sorting !== 0) {
      if (sorting > 0) {
        indices.sort(function (a, b) {
          var x = data[a][sorting-1]
            , y = data[b][sorting-1]
          return x == y ? 0 : (x > y ? 1 : -1)
        })
      } else {
        indices.sort(function (a, b) {
          var x = data[a][-sorting-1]
            , y = data[b][-sorting-1]
          return x == y ? 0 : (x > y ? -1 : 1)
        })
      }
    }
    return indices
  },
  render: function () {
    var data = this.props.data
      , features = this.props.features
      , classes = this.props.classes
      , that = this
      , indices = this.getIndices()
    return (
      <div className='feature-table'>
        <table>
          <thead>
            <tr>
              <td className='feature-table__id-head'>Id {this.sorter(0)}</td>
              <td className='feature-table__class-head'>Class {this.sorter(1)}</td>
              {
                features.map(this.featureHeader)
              }
            </tr>
          </thead>
          <tbody>
            {
              indices.map(function (i, x) {
                var cls = x%2 ? 'row-odd' : 'row-even'
                cls += ' class-' + classes.indexOf(data[i][1])
                return (
                  <tr key={i} className={cls}>
                    {
                      data[i].map(function (item, i) {
                        return (
                          <td key={i} title={item + ''}>
                            {toval(item)}
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  },
})

function toval(item) {
  var val = item + '';
  if (val.length > 11) {
    return val.slice(0, 8) + '...'
  }
  return val
}

