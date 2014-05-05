/** @jsx React.DOM */

var ListProjects = require('./list-projects/index.jsx')
  , NewProject = require('./new-project.jsx')
  , Project = require('./project/index.jsx')

  , Router = require('react-router')

var Projects = module.exports = React.createClass({
  displayName: 'Projects',
  mixins: [Router],
  routes: {
    '': ListProjects,
    'new': NewProject,
    '*': [Project, function () {
      return {projectList: this.goTo.bind(null, '')}
    }]
  },
  render: function () {
    return (
      <div className='projects'>
        {this.outlet()}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

