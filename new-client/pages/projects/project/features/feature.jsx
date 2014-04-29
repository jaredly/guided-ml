/** @jsx React.DOM */

var FeatureEditor = require('./feature-editor.jsx')
  , FeatureEffectsViewer = require('./feature-effects-viewer.jsx')

var Feature = module.exports = React.createClass({
  displayName: 'Feature',
  model: function (done) {
    this.props.dao.getFeature(this.props.id, done)
  },
  componentWillMount: function () {
    if (this.props.param === 'new') {
      return this.setState({
        model:
      })
    }
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

