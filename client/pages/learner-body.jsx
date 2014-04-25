
var LEARNERS = require('../learners').LEARNERS
  , Confusion = require('./confusion.jsx')

module.exports = React.createClass({
  displayName: 'LearnerBody',
  getDefaultProps: function () {
    return {
      data: null,
      model: null
    }
  },
  render: function () {
    var learner = this.props.data
      , names = LEARNERS[learner.type].args
      , acc = this.props.model.accuracy[learner.id]
      , conf = this.props.model.confusion[learner.id]
      , classes = this.props.model.classes

    return (
      <div className='learner-body'>
        <h4>Confusion Matrix</h4>
        <Confusion matrix={conf} classes={classes}/>
      </div>
    )
  }
})
