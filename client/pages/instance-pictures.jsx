
var FEATURES = require('../features').FEATURES

var InstancePictures = module.exports = React.createClass({
  displayName: 'InstancePictures',
  getDefaultProps: function () {
    return {
      sorting: 1,
      sortBy: function () {throw 'over'},
      data: null,
      instances: null,
      features: null
    }
  },
  getInitialState: function () {
    return {
      showing: [],
      size: 'small'
    }
  },
  toggleShowing: function (ix, e) {
    e.stopPropagation()
    e.preventDefault()
    var at = this.state.showing.indexOf(ix)
      , sh = this.state.showing
    if (at === -1) {
      sh.push(ix)
    } else {
      sh.splice(at, 1)
    }
    sh.sort()
    this.setState({showing: sh})
    return false
  },
  setSize: function (size) {
    this.setState({size: size})
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
  getIndices: function () {
    var indices = []
      , data = this.props.data
      , sorting = this.props.sorting
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
  sizeButtons: function () {
    var sizes = ['small', 'med', 'large', 'full']
      , current = this.state.size
      , setSize = this.setSize

    return (
      <div className='size-buttons'>
        {
          sizes.map(function (size) {
            var cls = size === current ? ' selected' : ''
            return (
              <button className={'size-button' + cls}
                      onClick={setSize.bind(null, size)}>
                {size}
              </button>
            )
          })
        }
      </div>
    )
  },
  featuresHeader: function () {
    var selected = this.props.selected
    return (
      <div className='instance-features__header'>
        <ul className='instance-pictures__features'>
          <li className='no-select instance-pictures__feature'>
            Id {this.sorter(0)}
          </li>
          <li className='no-select instance-pictures__feature'>
            Class {this.sorter(1)}
          </li>
          {
            this.props.features.map(function (feature, ix) {
              var cls = feature.id === this.props.selected ? ' selected' : ''
                , showing = this.state.showing.indexOf(ix) !== -1
                , sh_cls = 'fa fa-eye' + (showing ? '' : '-slash')
              return (
                <li key={feature.id}
                    className={'instance-pictures__feature' + cls}
                    onClick={this.props.toggleEditing.bind(null, feature.id)}>
                  <i className={sh_cls} onClick={this.toggleShowing.bind(null, ix)}/>
                  {feature.name}
                  {this.sorter(ix + 2)}
                </li>
              )
            }.bind(this))
          }
        </ul>
        {this.sizeButtons()}
      </div>
    )
  },
  visual: function (inst) {
    var url = this.props.baseUrl
    if (inst.has_vid) {
      return (
        <video src={url + '/vid/' + inst.id}/>
      )
    }
    if (inst.has_img) {
      return (
        <img src={url + '/img/' + inst.id}/>
      )
    }
    return <div className='filler'>No visual for this instance</div>
  },
  table: function (row) {
    if (!this.state.showing.length) return
    var features = this.props.features
    if (this.state.showing.length === 1) {
      var val = row[this.state.showing[0] + 2]
      return (
        <table className='instance-pictures__instance__table'>
          <tbody>
            <tr>
              <td title={val + ''}>
                {toval(val)}
              </td>
            </tr>
          </tbody>
        </table>
      )
    }
    return (
      <table className='instance-pictures__instance__table'>
        <tbody>
          {
            this.state.showing.map(function (ix, i) {
              var val = row[ix + 2]
              return (
                <tr key={i}>
                  <td>
                    {features[ix].name}
                  </td>
                  <td title={val + ''}>
                    {toval(val)}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  },
  showInstance: function (i, x) {
    var cls = 'instance-pictures__instance'
      , row = this.props.data[i]
      , inst = this.props.instances[i]
      , vclass = this.props.data[i][1]
    cls += x%2 ? ' row-odd' : ' row-even'
    cls += ' class-' + this.props.classes.indexOf(vclass)
    return (
      <li key={i} className={cls}>
        <div title={vclass} className='instance-pictures__visual'>
          {this.visual(inst)}
          <div title={vclass} className='instance-pictures__title'>
            <span className='instance-pictures__id'>
              {i}
            </span>
            <span className='instance-pictures__class'>
              {vclass}
            </span>
          </div>
        </div>
        {this.table(row)}
      </li>
    )
  },
  render: function () {
    var indices = this.getIndices()
      , showing = this.state.showing
    return (
      <div className={'instance-pictures instance-pictures--' + this.state.size}>
        {this.featuresHeader()}
        <ul className='instance-pictures__instances'>
          {
            indices.map(this.showInstance)
          }
        </ul>
      </div>
    )
  }
})

function toval(item) {
  var val = item + '';
  if (val.length > 11) {
    return val.slice(0, 8) + '...'
  }
  return val
}

