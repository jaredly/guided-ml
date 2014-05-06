/** @jsx React.DOM */

var DropDown = require('general-ui').DropDown
  , features = require('../../../../features')

var FeatureTypePicker = module.exports = React.createClass({
  displayName: 'FeatureTypePicker',
  render: function () {
    var items = Object.keys(features).map(function (name) {
      return [name, name]
    })
    return (
      <DropDown selected={this.props.value} action={this.props.onChange} items={items}/>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

