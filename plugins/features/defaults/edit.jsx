

module.exports = React.createClass({
  displayName: '1 Dim Statistics',
  getDefaultProps: function () {
    return {
      onApply: function (){ throw 'override' },
      dimargs: ['dim'],
      dims: null,
      args: null,
      feature: {},
    }
  },
  getInitialState: function () {
    return {
      data: this.props.args // _.cloneDeep(this.props.data)
    }
  },
  update: function (update) {
    if (!this.state.data.stats) this.state.data.stats = {}
    this.setState({
      data: React.addons.update(this.state.data, update)
    })
  },
  changeStat: function (name, e) {
    var val = e.target.checked
      , update = {stats: {}}
    update.stats[name] = {$set: val}
    this.update(update)
  },
  changeArg: function (name, e) {
    var val = e.target.value
      , update = {}
    update[name] = {$set: val}
    this.update(update)
  },
  render: function () {
    var names = Object.keys(this.props.feature.args.stats || {})
      , changeStat = this.changeStat
      , stats = this.props.feature.args.stats
      , data = this.state.data
    return (
      <div className='dim-1-statistics'>
        {
          this.props.dimargs.map(function (argname) {
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
                      <input onChange={changeStat.bind(null, name)} type='checkbox' checked={data.stats && data.stats[name]}/>
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

