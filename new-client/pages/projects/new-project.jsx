/** @jsx React.DOM */

var Router = require('react-router')

var NewProject = module.exports = React.createClass({
  displayName: 'NewProject',
  mixins: [Router],
  title: 'New Project - Guided ML',
  getInitialState: function () {
    return {
      name: '',
      file: null
    }
  },
  changeName: function (e) {
    this.setState({name: e.target.value})
  },
  changeFile: function (e) {
    this.setState({file: e.target.files[0]})
  },
  onCreate: function () {
    this.props.ctx.dao.createProject(
        this.state.name,
        this.state.file,
        function (err, obj) {
      this.props.goTo(obj.project.id)
    }.bind(this))
  },
  render: function () {
    return (
      <div className='new-project'>
        <div className='new-project__head'>
          <button className='new-project__back'
            onClick={this.props.goTo.bind(null, '', false, false)}>Back</button>
          <span className='new-project__title'>
            Create a new project
          </span>
        </div>
        <div className='new-project__body'>
          <input type='text'
            className='new-project__name'
            value={this.state.name}
            onChange={this.changeName}
            placeholder='New Project Name'/>
          <input type='file' onChange={this.changeFile}/>
          <button className='new-project__create'
            onClick={this.onCreate}>Create</button>
        </div>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

