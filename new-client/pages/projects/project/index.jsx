/** @jsx React.DOM */

var DropDown = require('general-ui').DropDown
  , Features = require('./features/index.jsx')
  // , Reducers = require('./re
  , Learners = require('./learners/index.jsx')
  , Main = require('./main.jsx')

  , Router = require('react-router')

var Project = module.exports = React.createClass({
  displayName: 'Project',
  mixins: [Router],
  routes: {
    '': Main,
    'features': Features,
    'learners': Learners,
    // 'reducers': Reducers,
  },
  getContext: function () {
    return {
      pid: this.props.param
    }
  },
  switchPage: function (page) {
    this.goTo(page)
  },
  render: function () {
    var route = this.state._route
    return (
      <div className='project'>
        <div className='project__header'>
          {DropDown({
            className: 'project__dropdonw',
            selected: route,
            onChange: this.switchPage,
            items: [
              ['Project', ''],
              ['Features', 'features'],
              // ['Reducers', 'reducers'],
              ['Learners', 'learners'],
              ['Close', '..'],
            ]
          })}
        </div>
        {this.outlet()}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

