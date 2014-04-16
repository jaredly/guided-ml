/** @jsx React.DOM */

var ModelMix = require('./modelmix')

var LearnersPage = module.exports = React.createClass({
  displayName: 'LearnersPage',
  mixins: [ModelMix],
  model: function () {
    return new Promise(function (res, rej) {
      res(null)
    })
  },
  render: function () {
    return (
      <div className='learners'>
        Learners
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

