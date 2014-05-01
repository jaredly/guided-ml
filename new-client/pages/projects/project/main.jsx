/** @jsx React.DOM */

var Model = require('react-model')

var Main = module.exports = React.createClass({
  displayName: 'Main',
  mixins: [Model],
  model: function (done) {
    this.props.ctx.dao.getProject(this.props.ctx.pid, done)
  },
  getInitialState: function () {
    return {
      file: null
    }
  },
  changeFile: function (e) {
    this.setState({file: e.target.files[0]})
  },
  onSubmit: function () {
    this.props.ctx.dao.changeProjectData(this.state.file, function (err, filename) {
      this.state.model.filename = filename
      this.setState({file: null})
    }.bind(this))
  },
  goToFeature: function () {
    if (!this.state.model.features.length) {
      this.props.goTo('features/new')
    } else {
      this.props.goTo('features')
    }
  },
  render: function () {
    var model = this.state.model
    if (!model) {
      return <div className='project-main'>Loading...</div>
    }
    return (
      <div className='project-main'>
        <div className='project-main__source'>
          {'Source: ' + model.filename}
          Replace with a different data file:
          <input type='file' onChange={this.changeFile}/>
          <button onClick={this.onSubmit}>Upload</button>
        </div>
        <div className='project-main__features' onClick={this.goToFeature}>
          {model.features.length ? model.features.length + ' Features' : 'Add a feature'}
        </div>
        <div className='project-main__reducers'>
          {model.reducers.length + ' Reducers'}
        </div>
        <div className='project-main__learners'>
          {model.learners.length + ' Learners'}
        </div>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

