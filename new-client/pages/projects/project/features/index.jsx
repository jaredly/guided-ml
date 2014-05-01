/** @jsx React.DOM */

var AllFeatures = require('./all-features.jsx')
  , NewFeature = require('./new-features.jsx')
  , Feature = require('./feature.jsx')
  , DropDown = require('general-ui').DropDown
  , InstanceViewer = require('./instance-viewer.jsx')

  , Router = require('react-router')
  , Model = require('react-model')

var Features = module.exports = React.createClass({
  displayName: 'Features',
  mixins: [Router, Model],
  model: function (done) {
    this.props.ctx.dao.listFeatures(this.props.ctx.pid, done)
  },
  routes: {
    '': AllFeatures,
    'new': NewFeature,
    '*': Feature
  },

  render: function () {
    var features = this.state.model
      , current = this.state._route.name
      , items = [['All', '']]
    if (features) {
      for (var i=0; i<features.length; i++) {
        items.push([features[i].name, features[i].id])
      }
    } else {
      items.push(['Loading...', false])
    }
    return (
      <div className='features'>
        <div className='features__header'>
          {features.length ? DropDown({
            className: 'features__dropdown',
            onChange: this.goTo,
            value: current,
            items: items
          }) : 'No features yet...'}
          <button onClick={this.goTo.bind(null, 'new', false, false)}>New Feature</button>
        </div>
        <div className='features__row'>
          <div className='features__main'>
            {this.outlet()}
          </div>
          <div className='features__instances'>
            {InstanceViewer({
              dao: this.props.dao,
              feature: current,
            })}
          </div>
        </div>
        <div className='features__results'>
          <div className='features__restults-head'>
            <span>Results</span>
            <i className='fa fa-arrow-down'/>
          </div>
          <div className='features__restults-body'>
            {this.state.showResults && ResultsViewer({
              dao: this.props.dao
            })}
          </div>
        </div>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

