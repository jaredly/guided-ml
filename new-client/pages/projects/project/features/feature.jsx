/** @jsx React.DOM */

var FeatureEditor = require('./feature-editor.jsx')
  , FeatureEffectsViewer = require('./feature-effects-viewer.jsx')
  , Model = require('react-model')

var Feature = module.exports = React.createClass({
  displayName: 'Feature',
  mixins: [Model],
  model: function (done) {
    this.props.dao.getFeature(this.props.id, done)
  },
  render: function () {
    var feature = this.state.model && this.state.model.feature
      , data = this.state.model && this.state.model.data
    return (
      <div className='feature'>
        {this.state.error && 'Error: ' + this.state.error}
        {this.state.loading && 'Loading...'}
        {feaeture && FeatureEditor({
          name: feature.name,
          type: feature.type,
          args: feature.args
        })}
        {data && FeatureEffectsViewer({
          data: data
        })}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

