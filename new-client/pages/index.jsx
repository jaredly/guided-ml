
var Login = require('./login.jsx')
  , Projects = require('./projects/index.jsx')

  , Router = require('react-router')

var Main = module.exports = React.createClass({
  displayName: 'Main',
  mixins: [Router],
  getInitialState: function () {
    return {
      user: null
    }
  },
  getDefaultProps: function () {
    return {
      dao: null
    }
  },
  context: function () {
    return {dao: this.props.dao}
  },
  routes: {
    '': 'projects',
    'login': [Login, function () {
      return {
        onLogin: this.onLogin
      }
    }],
    'projects': [Projects, function () {
      return {
      }
    }]
  },
  onLogin: function (user, redirect) {
    this.setState({
      user: user,
    })
    this.goTo(redirect, true)
  },
  render: function () {
    return (
      <div className='guided-ml'>
        {this.outlet()}
      </div>
    )
  },
})

