/** @jsx React.DOM */

var FeaturesPage = require('./features.jsx')
  , LearnersPage = require('./learners.jsx')

var ProjectPage = module.exports = React.createClass({
  displayName: 'ProjectPage',
  getDefaultProps: function () {
    return {
      args: {},
      dao: null,
      goHome: function () {},
      goToPage: function () {}
    }
  },
  getInitialState: function () {
    return {
      page: 'features',
      error: null,
      name: null
    }
  },
  componentDidMount: function () {
    var that = this
    this.model().then(function (value) {
      that.setState({name: value})
    }, function (reason) {
      that.setState({name: null, error: reason})
    })
  },
  model: function (cb) {
    return this.props.dao.getProjectName(this.props.args.id)
  },
  /*
  getProjectData: function () {
    this.setState({error: null, data: null})
    this.props.dao.getProjectData(this.props.pid, this.gotProjectData)
  },
  gotProjectData: function (err, data) {
    if (err) return this.setState({error: err})
    this.setState({data: data, error: null})
  },
  */
  pages: {
    features: FeaturesPage,
    learners: LearnersPage
  },
  getContent: function () {
    if (this.state.error) {
      return <div className='project__error'>Error loading project data</div>
    }
    return this.pages[this.state.page]({
      pid: this.props.args.id,
      dao: this.props.dao
    })
  },
  getNav: function () {
    var page = this.state.page
      , pages = Object.keys(this.pages)
      , that = this
    return (
      <ul className='project__nav'>{
        pages.map(function (name) {
          var cls = name === page ? ' selected' : ''
          return (
            <li key={name}
                className={'project__nav-item' + cls}
                onClick={that.goToPage.bind(null, name)}>
              {name}
            </li>
          )
        })
      }</ul>
    )
  },
  goToPage: function (name) {
    this.setState({page: name})
  },
  getHeader: function () {
    return (
      <div className='project__header'>
        <button className='project__back' onClick={this.props.goHome}>Back</button>
        <div className='project__name'>{this.state.name || 'Loading...'}</div>
        {this.getNav()}
      </div>
    )
  },
  render: function () {
    return (
      <div className='project'>
        {this.getHeader()}
        {this.getContent()}
      </div>
    )
  }
});

