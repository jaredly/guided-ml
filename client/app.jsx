/** @jsx React.DOM */

var IndexPage = require('./pages/index.jsx')
  , ProjectPage = require('./pages/project.jsx')

var App = module.exports = React.createClass({
  displayName: 'App',
  getDefaultProps: function () {
    return {
      dao: null
    }
  },
  getInitialState: function () {
    return {
      page: {
        name: 'index'
      }
    }
  },
  getPage: function () {
    return {
      index: IndexPage,
      project: ProjectPage
    }[this.state.page.name]({
      goToPage: this.goToPage,
      goHome: this.goHome,
      args: this.state.page.args,
      dao: this.props.dao
    });
  },
  goHome: function () {
    this.setState({page: {name: 'index', args: {}}})
  },
  goToPage: function (name, args) {
    this.setState({page: {name: name, args: args}});
  },
  render: function () {
    return this.getPage()
  }
})

