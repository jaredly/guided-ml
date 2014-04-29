/** @jsx React.DOM */

var ListProjects = module.exports = React.createClass({
  displayName: 'ListProjects',
  enter: function () {
    if (!this.props..user) {
      return this.props.goTo('login')
    }
  },
    displayName: 'ListProjects',
    render: function () {
    }
  })
})

module.exports = {
  routes: {
  },
  enter: function (context, args) {
    if (!context.user) {
      return context.router.goTo('login')
    }
  },
  view: React.createClass({
  })
}

// vim: set tabstop=2 shiftwidth=2 expandtab:

