/** @jsx React.DOM */

var features = require("../../../../features.js")
  , DefaultWidget = require('./default-widget.jsx')
  , _ = require('lodash')

var FeatureEditor = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      name: '',
      type: '',
      args: {},
      dims: [],
      buttonText: 'Apply',
      onApply: function (name, args) {console.log('Name', name, 'Args', args)},
      disabled: false
    }
  },
  getInitialState: function () {
    return {
      name: this.props.name,
      args: _.cloneDeep(this.props.args)
    }
  },
  changeName: function (e) {
    this.setState({name: e.target.value})
  },
  changeArg: function (name, value) {
    var update = {}
    update[name] = {$set: value}
    var args = React.addons.update(this.state.args, update)
    this.setState({args: args})
  },
  action: function () {
    this.props.onApply(this.state.name, this.state.args)
  },
  render: function () {
    var feature = features[this.props.type] || {}
      , args = args || {}
      , widget = feature.widget || DefaultWidget
    return (
      <div className='feature-editor'>
        <div className='feature-editor_top'>
          <input placeholder="Feature Name" value={this.state.name} onChange={this.changeName}/>
          <button onClick={this.action}>{this.props.buttonText}</button>
        </div>
        <p className='feature-editor_description'>{feature.description}</p>
        {widget({feature: feature, args: this.state.args, changeArg: this.changeArg, dims: this.props.dims})}
      </div>
    )
  },
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

