/** @jsx React.DOM */

var ProjectsList = require('./projects-list.jsx')

var IndexPage = module.exports = React.createClass({
  displayName: 'IndexPage',
  getDefaultProps: function () {
    return {
      dao: null,
      goToPage: function () {},
      args: null
    }
  },
  getInitialState: function () {
    return {
      projects: null,
      uploadProgress: null,
      uploadError: null,
      error: null
    }
  },
  componentDidMount: function () {
    this.getProjectsList();
  },
  getProjectsList: function () {
    this.setState({error: null, projects: null});
    this.props.dao.listProjects(this.gotProjectsList);
  },
  gotProjectsList: function (err, projects) {
    if (err) {
      return this.setState({error: err})
    }
    this.setState({projects: projects})
  },
  newProject: function (name, file) {
    var setState = this.setState.bind(this)
    this.props.dao.newProject(name, filei.files[0])
      .on('progress', function (perc) {
        setState({uploadProgress: perc})
      })
      .on('abort', function () {
        setState({uploadError: 'Upload aborted'})
      })
      .on('error', function (evt) {
        setState({uploadError: 'Upload failed'})
      })
      .on('success', function (text, xhr) {
        var data = JSON.parse(text)
          , projects = this.state.projects.slice()
        projects.push({id: data.id, name: name})
        setState({projects: projects})
      }.bind(this))
  },
  createdProject: function () {

  },

  // content pages
  getContent: function () {
    if (this.state.error) {
      return this.showError();
    }
    if (!this.state.projects) {
      return this.loading();
    }
    return this.projectPicker();
  },
  loading: function () {
    return <div className="index__loading">Loading...</div>
  },
  showError: function () {
    return (
      <div className="index__error">
        <h3 className="index__error__header">Failed to get project list</h3>
        {this.state.error}
      </div>
    )
  },
  goToProject: function (id) {
    this.props.goToPage('project', {id: id});
  },
  projectPicker: function () {
    return ProjectsList({
      projects: this.state.projects,
      goToProject: this.goToProject,
      uploadProgress: this.state.uploadProgress,
      uploadError: this.state.uploadError
    });
  },

  render: function () {
    return (
      <div className="index">
        <h1 className="index__title">Guided ML</h1>
        {this.getContent()}
      </div>
    )
  }
})

