/** @jsx React.DOM */

var DropDown = require('general-ui').DropDown
  , Features = require('./features/index.jsx')
  // , Reducers = require('./re
  , Learners = require('./learners/index.jsx')
  , Main = require('./main.jsx')

  , Router = require('react-router')
  , Model = require('react-model')

var Project = module.exports = React.createClass({
  displayName: 'Project',
  mixins: [Router, Model],
  routes: {
    '': Main,
    'features': Features,
    'learners': Learners,
    // 'reducers': Reducers,
  },
  model: function (done) {
    this.props.ctx.dao.getProject(this.props.param, done)
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
      , name = this.state.model ? this.state.model.name : 'Project Loading...'
    return (
      <div className='project'>
        <div className='project__header'>
          {DropDown({
            className: 'project__dropdonw',
            selected: route,
            onChange: this.switchPage,
            items: [
              [name, ''],
              ['Features', 'features'],
              // ['Reducers', 'reducers'],
              ['Learners', 'learners'],
              ['Close', '..'],
            ]
          })}
        </div>
        <div className='project__body'>
          {this.outlet()}
        </div>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

