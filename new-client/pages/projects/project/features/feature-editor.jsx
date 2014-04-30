/** @jsx React.DOM */

var FeatureEditor = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      name: '',
      type: '',
      args: null,
      buttonText: 'Apply',
      onApply: function () {throw 'override'},
      disabled: false
    }
  },
  render: function () {
    return (
      <div className='feature-editor'>
        Edit a feature here
      </div>
    )
  },
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

