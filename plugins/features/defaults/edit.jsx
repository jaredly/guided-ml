
var _ = require('lodash')

module.exports = React.createClass({
  displayName: '1 Dim Statistics',
  getDefaultProps: function () {
    return {
      onApply: function (){ throw 'override' },
      aegWidget: function (){ throw 'override' },
      dims: null,
      args: null,
      data: null,
    }
  },
  getInitialState: function () {
    return {
      data: _.cloneDeep(this.props.data)
    }
  },
  updata: function (update) {
    this.setState({
      data: React.addons.update(this.state.data, update)
    })
  },
  changeStat: function (name, e) {
    var val = e.target.checked
      , update = {state: {}}
    update.state[name] = {$set: val}
    this.update(update)
  },
  changeArg: function (name, e) {
    var val = e.target.value
      , update = {}
    update[name] = {$set: val}
    this.update(update)
  },
  render: function () {
    var names = Object.keys(this.props.args.stats)
      , changeStat = this.changeStat
      , stats = this.props.args.stats
      , data = this.state.data
    return (
      <div className='dim-1-statistics'>
        {
          this.props.dimargs.map(function (argnmae) {
            return (
              <label>
                {argname}
                <select value={this.state.data[argname]} onChange={this.changeArg.bind(null, argname)}>
                  {
                    this.props.dims.map(function (dim) {
                      return <option value={dim}>{dim}</option>
                    })
                  }
                </select>
              </label>
            )
          }.bind(this))
        }
        <h4>Which Stats</h4>
        <table>
          {
            names.map(function (name, i) {
              var stat = stats[name]
              return (
                <tr key={name}>
                  <td>
                    <label>
                      <input onChange={changeStat.bind(null, name)} type='checkbox' checked={data.stats[name]}/>
                      <span>{stat.title}</span>
                    </label>
                  </td>
                  <td>
                    <p>
                      {stat.description}
                    </p>
                  </td>
                </tr>
              )
            })
          }
        </table>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

