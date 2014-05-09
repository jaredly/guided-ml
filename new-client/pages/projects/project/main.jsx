/** @jsx React.DOM */

var Main = module.exports = React.createClass({
  displayName: 'ProjectMain',
  getDefaultProps: function () {
    return {
      onUploadFile: function (file) {console.log('want to upload file')},
      goTo: function (where) {console.log('going to', where)},
      filename: 'the-file.zip',
      numFeatures: 0,
      numLearners: 0,
      numReducers: 0
    }
  },
  getInitialState: function () {
    return {
      file: null
    }
  },
  changeFile: function (e) {
    this.setState({file: e.target.files[0]})
  },
  goToFeature: function () {
    if (!this.props.numFeatures) {
      this.props.goTo('features/new')
    } else {
      this.props.goTo('features')
    }
  },
  onSubmit: function () {
    this.props.onUploadFile(this.state.file)
  },
  render: function () {
    return (
      <div className='project-main'>
        <div className='project-main__source'>
          <div className='project-main_filename'>
            {this.props.filename}
          </div>
          Replace with a different data file:
          <input type='file' onChange={this.changeFile}/>
          <button onClick={this.onSubmit}>Upload</button>
        </div>
        <div className='project-main__features' onClick={this.goToFeature}>
          {this.props.numFeatures ? this.props.numFeatures + ' Features' : 'Add a feature'}
        </div>
        <div className='project-main__reducers'>
          {this.props.numReducers + ' Reducers'}
        </div>
        <div className='project-main__learners'>
          {this.props.numLearners + ' Learners'}
        </div>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

