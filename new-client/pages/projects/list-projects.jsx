/** @jsx React.DOM */

var Model = require('react-model')
  , Router = require('react-router')

var ListProjects = module.exports = React.createClass({
  displayName: 'ListProjects',
  mixins: [Model, Router],
  model: function (done) {
    this.props.ctx.dao.listProjects(done)
  },
  title: function () {
    return 'List Projects - Guided ML'
  },
  render: function () {
    var goTo = this.props.goTo
    return (
      <div className='list-projects'>
        Projects
        <ul className='list-projects__list'>
          {this.state.loading && 'Loading...'}
          {
            this.state.model && this.state.model.map(function (project) {
              return (
                <li className='list-projects__project' onClick={goTo.bind(null, project.id, false, false)}>
                  {project.name}
                </li>
              )
            })
          }
          <li className='list-projects__new' onClick={goTo.bind(null, 'new', false, false)}>
            New Project
          </li>
        </ul>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:
