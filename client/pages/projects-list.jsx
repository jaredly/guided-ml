/** @jsx React.DOM */

var ProjectsList = module.exports = React.createClass({
  displayName: 'ProjectsList',
  getDefaultProps: function () {
    return {
      projects: [],
      goToProject: function () {},
      newProject: function () {},
      uploadProgress: null,
      uploadError: false
    }
  },
  getInitialState: function () {
    return {
      error: null
    }
  },
  action: function (e) {
    e.preventDefault();
    e.stopPropagation();
    var name = this.refs.name.getDOMNode().value;
    var filei = this.refs.file.getDOMNode();
    if (!name) {
      return this.setState({error: 'Name is required'});
    } else if (!filei.files.length) {
      this.setState({error: 'You must select a zip file'});
    } else {
      this.setState({error: null});
    }
    this.props.newProject(name, filei.files[0]);
    return false;
  },
  error: function () {
    if (!this.state.error) return;
    return <div className="projects__form__error">{this.state.error}</div>
  },
  render: function () {
    return (
      <div className="projects">
        <ul className="projects__list">{
          this.props.projects.map(function (project) {
            return (
              <li className="projects__project" key={project.id} onClick={this.props.goToProject.bind(null, project.id)}>
                {project.name}
              </li>
            )
          }.bind(this))
        }</ul>
        <form action={this.action}>
          {this.error()}
          <input type="text" placeholder="Project Name" ref="name" required/>
          <input type="file" accept="*.zip" ref="file" required/>
          <button type="submit" onClick={this.action}>Create Project</button>
        </form>
      </div>
    )
  }
});

