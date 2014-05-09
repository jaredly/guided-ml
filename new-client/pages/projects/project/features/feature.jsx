/** @jsx React.DOM */

var FeatureEditor = require('./feature-editor.jsx')
  , FeatureEffectsViewer = require('./feature-effects-viewer.jsx')

var Feature = module.exports = React.createClass({
  displayName: 'Feature',
  getDefaultProps: function () {
    return {
      feature: null,
      data: null,
      classes: null,
      instance_info: null,
      loading: false,
      error: false
    }
  },
  showError: function () {
    if (!this.props.error) return
    return 'Error: ' + this.props.error
  },
  showLoading: function () {
    if (!this.props.loading) return
    return <div className='feature'>Loading...</div>
  },
  onChange: function (data) {
    if (this.props.loading) return
    this.props.onChange(data)
  },
  render: function () {
    var feature = this.props.feature
    return (
      <div className='feature'>
        {this.showError()}
        {this.showLoading()}
        {feature && FeatureEditor({
          name: feature.name,
          type: feature.type,
          args: feature.args,
          onChange: this.onChange,
        })}
        {this.props.data && FeatureEffectsViewer({
          instance_info: this.props.instance_info,
          classes: this.props.classes,
          data: this.props.data
        })}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

