/** @jsx React.DOM */

var App = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      dao: null
    }
  },
  getInitialState: function () {
    return {
      projects: null
    }
  },
  loading: function () {
    return <div className='loading'>Loading...</div>
  },
  render: function () {
    if (!this.state.projects) {
      return this.loading()
    }
  }
})

