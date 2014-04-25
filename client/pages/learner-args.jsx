
var LEARNERS = require('../learners').LEARNERS

module.exports = React.createClass({
  displayName: 'LearnerBody',
  getDefaultProps: function () {
    return {
      data: null
    }
  },
  render: function () {
    var learner = this.props.data
      , names = LEARNERS[learner.type].args
    return (
      <table className='learner-args'>
        {
          Object.keys(learner.args).map(function (arg) {
            return (
              <tr>
                <td className='learner-args__key'>{names[arg].title}</td>
                <td>{learner.args[arg]}</td>
              </tr>
            )
          })
        }
      </table>
    )
  }
})
