
var FeatureTable = module.exports = React.createClass({
  displayName: 'FeatureTable',
  getInitialState: function () {
    return {
      sorting: 0
    }
  },
  sortBy: function (i, e) {
    e.stopPropagation()
    e.preventDefault()
    this.setState({sorting: i})
  },
  featureHeader: function (feature, i) {
    var cls = ''
      , that = this
      , by = i + 2
      , sorting = i + 2 === this.state.sorting
    if (sorting) {
      cls = ' sorting-down'
      by = -by
    } else if (i + 2 === -this.state.sorting) {
      cls = ' sorting-up'
    }
    return (
      <td key={feature.id}
          onClick={that.props.editFeature.bind(null, feature.id)}>
        {feature.name}
        <span className={"sorter" + cls}
          onClick={that.sortBy.bind(null, by)}>
          {sorting ? '^' : 'v'}
        </span>
      </td>
    )
  },
  render: function () {
    var data = this.props.data
      , features = this.props.features
      , sorting = this.state.sorting
      , that = this
    var indecies = []
    for (var i=0; i<data.length; i++) {
      indecies.push(i)
    }
    if (sorting !== 0) {
      if (sorting > 0) {
        indecies.sort(function (a, b) {
          return data[a][sorting] - data[b][sorting]
        })
      } else {
        indecies.sort(function (a, b) {
          return data[b][-sorting] - data[a][-sorting]
        })
      }
    }
    return (
      <div className='feature-table'>
        Feature Table!
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Class</td>
              {
                features.map(this.featureHeader)
              }
            </tr>
          </thead>
          <tbody>
            {
              indecies.map(function (i) {
                return (
                  <tr key={i} >
                    {
                      data[i].map(function (item, i) {
                        return (
                          <td key={i}>
                            {item}
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

