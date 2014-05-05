/** @jsx React.DOM */

var ResultsViewer = require('./results-viewer.jsx')

var ResultsBar = module.exports = React.createClass({
  displayName: 'ResultsBar',
  getInitialState: function () {
    return {
      open: false,
      height: 200
    }
  },
  open: function (e) {
    this.setState({open: true})
    e.preventDefault()
    e.stopPropagation()
    return false
  },
  close: function (e) {
    this.setState({open: false})
    e.preventDefault()
    e.stopPropagation()
    return false
  },
  render: function () {
    var main
    if (this.state.open) {
      main = ResultsViewer({
        dao: this.props.dao,
        feature: this.props.feature,
        pid: this.props.pid
      })
    } else {
      main = (
        <div className='results-opener' onClick={this.open}>
          View Results <i className='fa fa-caret-up'/>
        </div>
      )
    }
    return (
      <div className='results-bar'>
        {main}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

