/** @jsx React.DOM */

var DropDown = require('general-ui').DropDown
  , Features = require('./features/index.jsx')
  // , Reducers = require('./re
  , Learners = require('./learners/index.jsx')
  , Main = require('./main.jsx')

  , Router = require('react-router')
  , Model = require('react-model')

function makeUpdate(attrs, value) {
  var update = {}
    , c = update
  while (attrs.length) {
    c = c[attrs.shift()] = {}
  }
  c['$set'] = value
  return update
}

var Project = module.exports = React.createClass({
  displayName: 'Project',
  mixins: [Router, Model],
  routes: {
    _index: [Main, function () {
      var model
      return {
        onUploadFile: this.onUploadFile,
        filename: model.filename,
        numFeatures: model.features.length,
        numReducers: model.features.length,
        numLearners: model.learners.length
      }
    }],
    'features': Features,
    'learners': Learners,
  },
  model: {
    model: Project,
    args: function () {
      return [this.props.param]
    }
  },
  /*
  model: function (done) {
    Project.get(this.props.param, done)
  },
  */
  getContext: function () {
    return {
      pid: this.props.param,
      project: this.state.model ? (
        new Project(this.state.model, this.onProjectChanged)
      ) : false
    }
  },
  // onProjectChanged(err, model)
  // onProjectChanged(err, attr, value)
  // onProjectChanged(err, [path, to, attr], value)
  onProjectChanged: function (err, attr, value) {
    if (err) {
      return this.setState({modelError: err})
    }
    if (arguments.length === 1) {
      return this.setState({model: attr})
    }
    if (!Array.isArray(attr)) {
      attr = [attr]
    }
    this.setState({
      model: React.addons.update(this.state.model, makeUpdate(attr, value))
    })
  },
  switchPage: function (page) {
    this.goTo(page)
  },

  // for main

  onUploadFile: function (file) {
    this.props.ctx.dao.changeProjectData(file, function (err, filename) {
      // this.state.model.filename = filename
      var model = React.addons.update(model, {
        filename: {$set: filename}
      })
      this.setState({model: model})
    }.bind(this))
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

