

module.exports = React.createClass({
  displayName: '1 Dim Statistics',
  getDefaultProps: function () {
    return {
      changeArg: function (){ throw 'override' },
      dimargs: ['dim'],
      dims: null,
      args: null,
      feature: {},
    }
  },
  changeArg: function (name, e) {
    this.props.changeArg(name, e.target.value)
  },
  /*
  changeStat: function (name, e) {
    this.props.changeArg(name, e.target.checked)
  },
  */
  render: function () {
    var names = Object.keys(this.props.feature.args.stats || {})
      , stats = this.props.feature.args.stats
      , args = this.props.args
    return (
      <div className='dim1-stats'>
        {
          this.props.dimargs.map(function (argname) {
            return (
              <label>
                {argname}
                <select value={args[argname]} onChange={this.changeArg.bind(null, argname)}>
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
        <div className='dim1-stats_buttons'>
          {
            names.map(function (name, i) {
              var stat = stats[name]
                , checked = args.stats && args.stats[name]
                , cls = 'dim1-stats_button' + (checked ? ' dim1-stats_button--checked' : '')
              return (
                <button className={cls}
                  title={stat.description}
                  onClick={this.props.changeArg.bind(null, ['stats', name], !checked)}>
                  {stat.title}
                </button>
              )
            }.bind(this))
          }
        </div>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

