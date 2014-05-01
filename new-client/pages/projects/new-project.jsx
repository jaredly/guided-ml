/** @jsx React.DOM */

var Router = require('react-router')

var NewProject = module.exports = React.createClass({
  displayName: 'NewProject',
  mixins: [Router],
  title: 'New Project - Guided ML',
  render: function () {
    return (
      <div className='new-project'>
        New Project!!
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

