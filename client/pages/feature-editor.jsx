
var _ = require('lodash')
  , FEATURES = require('../features').FEATURES

var FeatureEditor = module.exports = React.createClass({
  displayName: 'FeatureEditor',
  getDefaultProps: function () {
    return {
      id: null,
      value: {},
      model: {},
      onChange: {},
      onClose: {},
      onRemove: function () {throw 'override'}
    }
  },
  getInitialState: function () {
    return {
      data: _.cloneDeep(this.props.value)
    }
  },
  componentWillReceiveProps: function (props) {
    this.setState({data: _.cloneDeep(props.value)})
  },
  onApply: function () {
    this.props.onChange(this.state.data)
  },
  changeAttr: function (attr, e) {
    var data = _.cloneDeep(this.state.data)
    data[attr] = e.target.value
    this.setState({data: data})
  },
  changeArg: function (arg, e) {
    var data = _.cloneDeep(this.state.data)
    data.args[arg] = e.target.value
    this.setState({data: data})
  },
  argWidget: function (name, arg, value) {
    if ('string' === typeof arg) {
      arg = {type: arg}
    }
    var change = this.changeArg.bind(null, name)
    var input
    if (arg.type === 'str-multi') {
      input = React.DOM.textarea({
        onChange: change,
        value: value,
      })
    } else if (arg.type === 'dim') {
      input = (
        <select value={value} onChange={change}>
          {
            this.props.model.headers.map(function (name) {
              return <option value={name}>{name}</option>
            })
          }
        </select>
      )
    }
    return (
      <div className='arg-widget'>
        <strong>{name}</strong>
        {input}
      </div>
    )
  },
  render: function () {
    var ftype = FEATURES[this.state.data.type]
      , args = Object.keys(ftype.args)
      , that = this
    return (
      <div className='feature-editor'>
        <input type="text" className='feature-editor__name' value={this.state.data.name} onChange={this.changeAttr.bind(null, 'name')}/>
        <div className='feature-editor__attrs'>
          {
            args.map(function (name) {
              return that.argWidget(name, ftype.args[name], that.state.data.args[name])
            })
          }
        </div>
        <button onClick={this.onApply} className='feature-editor__apply'>Apply</button>
        <button onClick={this.props.onClose} className='feature-editor__close'>Close</button>
        <button onClick={this.props.onRemove} className='feature-editor__remove'>Remove</button>
      </div>
    )
  }
})

