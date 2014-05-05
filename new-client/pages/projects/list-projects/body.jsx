/** @jsx React.DOM */

var Body = module.exports = React.createClass({
  displayName: 'Body',
  getDefaultProps: function () {
    return {
      goTo: function () {throw 'override'},
      model: []
    }
  },
  render: function () {
    var goTo = this.props.goTo
    return (
      <ul className='list-projects_body'>
        {
          this.props.model && this.props.model.map(function (project) {
            return (
              <li className='list-projects_body_project' onClick={goTo.bind(null, '../' + project.id, false, false)}>
                {project.name}
              </li>
            )
          })
        }
        <li className='list-projects_new' onClick={goTo.bind(null, 'new', false, false)}>
          Create New Project
        </li>
      </ul>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

