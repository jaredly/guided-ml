/** @jsx React.DOM */

var ModelMix = require('./modelmix')
  , LearnerEditor = require('./learner-editor.jsx')
  , learners = require('../learners')
  , LEARNERS = learners.LEARNERS

var LearnersPage = module.exports = React.createClass({
  displayName: 'LearnersPage',
  mixins: [ModelMix],
  model: function () {
    return this.props.dao.getLearnerData(this.props.pid)
  },
  getInitialState: function () {
    return {
      selected: null
    }
  },
  changeLearner: function (id, data) {
  },
  showLearner: function (learner, ix) {
    return (
      <li className='learners__learner' key={learner.id}>
        <div className='learners__learner-title'>{learner.name}</div>
        {
          this.state.selected === learner.id && LearnerEditor({
            data: learner,
            onChange: this.changeLearner.bind(null, learner.id)
          })
        }
      </li>
    )
  },
  newLearner: function (e) {
    ltype = e.target.value
    if (!LEARNERS[ltype]) return
    var that = this
      , name = ltype + ' ' + ('' + Math.random()).slice(0, 5)
      , args = learners.defaultArgs(ltype)
    this.props.dao.addLearner(this.props.pid, ltype, name, args).then(function (result) {
      var model = that.state.model
      model.learners.push(result.learner)
      model.confusion[result.learner.id] = result.confusion
      model.accuracy[result.learner.id] = result.accuracy
      model.assignments[result.learner.id] = result.assignments
      that.setState({model: model, selected: result.learner.id})
    })
  },
  render: function () {
    if (!this.state.model) {
      return <div className='learners learners--loading'>Loading...</div>
    }
    return (
      <div className='learners'>
        <ul className='learners__left'>
          { this.state.model.learners.map(this.showLearner) }
          <li className='learners__new'>
            <select value='New Learner' onChange={this.newLearner}>
              <option value='New Learner'>New Learner</option>
              {
                Object.keys(LEARNERS).map(function (name) {
                  return <option value={name}>{LEARNERS[name].title}</option>
                })
              }
            </select>
          </li>
        </ul>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:
