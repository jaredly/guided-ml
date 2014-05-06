/** @jsx React.DOM */

var marked = require('marked')

var WIDGETS = {
  'dim': React.createClass({
    change: function (e) {
      this.props.onChange(e.target.value)
    },
    render: function () {
      return (
        <select onChnage={this.change} value={this.props.value}>
          {
            this.props.dims.map(function (name) {
              return <option value={name}>{name}</option>
            })
          }
        </select>
      )
    },
  }),
  'str-multi': React.createClass({
    change: function (e) {
      this.props.onChange(e.target.value)
    },
    render: function () {
      return <textarea value={this.props.value} onChange={this.change}/>
    }
  }),
  'bool': React.createClass({
    change: function (e) {
      this.props.onChange(e.target.checked)
    },
    render: function () {
      return <input type='checkbox' onChange={this.change} checked={this.props.value}/>
    }
  })
}

var DefaultWidget = module.exports = React.createClass({
  displayName: 'DefaultWidget',
  getDefaultProps: function () {
    return {
      changeArg: function () {},
      dims: [],
      feature: {},
      args: {}
    }
  },
  render: function () {
    var feature = this.props.feature
      , changeArg = this.props.changeArg
      , dims = this.props.dims
      , args = this.props.args
    return (
      <ul className='default-widget'>
          {
            Object.keys(feature.args || {}).map(function (name) {
              var arg = feature.args[name]
              return (
                <li key={name}>
                  <div className='default-widget_arg_top'>
                    <span className='default-widget_title'>{arg.title}</span>
                    <span className='default-widget_value'>{
                      WIDGETS[arg.type]({
                        dims: dims,
                        value: args[name],
                        onChange: changeArg.bind(null, name)
                      })
                    }</span>
                  </div>
                  <p className='default-widget_description' dangerouslySetInnerHTML={{__html: marked(arg.description)}}></p>
                </li>
              )
            })
          }
      </ul>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

