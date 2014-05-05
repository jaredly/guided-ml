/** @jsx React.DOM */

var Model = require('react-model')
  , Router = require('react-router')

  , Body = require('./body.jsx')
  // , Loading = require('./loading.jsx')
  // , ErrorPage = require('./error.jsx')

var ListProjects = module.exports = React.createClass({
  displayName: 'ListProjects',
  mixins: [Model, Router],
  model: function (done) {
    this.props.ctx.dao.listProjects(done)
  },
  routes: {
    _index: Body,
    // _loading: Loading,
    // _error: ErrorPage
  },
  title: 'List Projects - Guided ML',
  render: function () {
    var goTo = this.props.goTo
    return (
      <div className='list-projects'>
        <span className='list-projects__title'>
          Projects
        </span>
        {this.outlet()}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:
