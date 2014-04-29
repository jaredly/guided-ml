
var _ = require('lodash')

var Index = module.exports = React.createClass({
  getInitialState: function () {
    return {
      user: null,
      _route: null
    }
  },
  getDefaultProps: function () {
    return {
      _router: null,
      _baseroute: '',
    }
  },
  componentWillMount: function () {
    if (this.props._router) {
      // I'm not the top router
      var redirect = this.enter && this.enter()
      if (redirect) this.props._router.redirect(redirect)
      return
    }
  },
  // used by child routes to refuse bequest
  redirect: function (where) {
    var parts = where[0]
    this.setState({
      _route: {parts: parts, params: where[1]}
    })
  },
  goTo: function (route, params) {
  },
  outlet: function () {
    var props = this.context()
    props._router = this.props._router || this // the base router
    props._url_frag = url_frag // the unparsed rest of the url
    props.params = params // params from :tokens in the url
    props.ref = '_outlet'

    return view(props)
  },
  hashchange: function (e) {
    var base = this.props._baseroute
    // out of my league
    if (location.hash.indexOf(base) !== 1) {
      return
    }
  },
  context: function () {
    return {
      user: this.state.user
    }
  },
  routes: function () {
    return {
      '/': ListProjects,
      '/login': LoginPage,
      '/project/:id': ProjectPage,
    }
  },
  render: function () {
    return (
      <div className='index'>
        {this.outlet()}
      </div>
    )
  }
})

