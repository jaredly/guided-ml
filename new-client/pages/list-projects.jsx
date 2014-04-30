/** @jsx React.DOM */

var Router = require('react-router')

var ListProjects = module.exports = react.createClass({
  displayName: 'ListProjects',
  mixins: [Router],
  enter: function () {
    if (!this.props..user) {
      return this.props.goTo('login')
    }
  },
  render: function () {
    return (
      <div className='list-projects'>
        Partieness
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

