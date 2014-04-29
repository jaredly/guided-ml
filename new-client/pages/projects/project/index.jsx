/** @jsx React.DOM */

var DropDown = require('general-ui').DropDown
  , Features = require('./features/index.jsx')
  // , Reducers = require('./re
  , Learners = require('./learners/index.jsx')

  , Router = require('react-router')

var Project = module.exports = React.createClass({
  displayName: 'Project',
  mixins: [Router],
  routes: {
    '': 'features',
    'features': Features,
    'learners': Learners,
    // 'reducers': Reducers,
  },
  getDefaultProps: function () {
    return {
      projectListing: function () {throw 'override'}
    }
  },
  switchPage: function (page) {
    if (page === false) return this.props.projectListing()
    this.goTo(page)
  },
  render: function () {
    var route = this.state._route.name
    return (
      <div className='project'>
        <div className='project__header'>
          {DropDown({
            className: 'project__dropdonw',
            selected: route,
            action: this.switchPage,
            items: [
              ['Project', '/'],
              ['Features', '/features'],
              // ['Reducers', '/reducers'],
              ['Learners', '/learners'],
              ['Close', false],
            ]
          })}
          Header here!
        </div>
        {this.outlet()}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

