/** @jsx React.DOM */

var FeatureEffectsViewer = module.exports = React.createClass({
  displayName: 'FeatureEffectsViewer',
  getDefaultProps: function () {
    return {
      data: null
    }
  },
  render: function () {
    return (
      <div className='feature-effects'>
        These are the effects of our features
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

