/** @jsx React.DOM */

var Model = require('react-model')

var ResultsViewer = module.exports = React.createClass({
  displayName: 'ResultsViewer',
  mixins: [Model],
  model: function (done) {
    this.props.dao.getResults(this.props.pid, done)
  },
  render: function () {
    return (
      <div className='results-viewer'>
        View your results here.
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

