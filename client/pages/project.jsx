/** @jsx React.DOM */

var ProjectPage = module.exports = React.createClass({
  displayName: 'ProjectPage',
  getDefaultProps: function () {
    return {
      pid: 0,
      dao: null,
      goToPage: function () {}
    }
  },
  getInitialState: function () {
    return {
      page: 'features',
      data: null
    }
  },
  getContent: function () {
    if (!this.state.data){
      return <div className='project__loading'>Loading...</div>
    }
  },
  render: function () {
    return (
      <div className='project'>
        Awesome
        {this.getContent()}
      </div>
    )
  }
});

