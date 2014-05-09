/** @jsx React.DOM */

var AllFeatures = require('./all-features.jsx')
  , NewFeature = require('./new-features.jsx')
  , Feature = require('./feature.jsx')
  , DropDown = require('general-ui').DropDown
  , InstanceViewer = require('./instance-viewer.jsx')
  , ResultsBar = require('./results-bar.jsx')

  , Router = require('react-router')
  , Model = require('react-model')

var Features = module.exports = React.createClass({
  displayName: 'Features',
  mixins: [Router, Model],
  model: function (done) {
    this.props.ctx.dao.listFeatures(this.props.ctx.pid, done)
  },
  routes: {
    _index: [AllFeatures, function () {
      return {
        model: this.state.model
      }
    }],
    'new': NewFeature,
    '*': Feature
  },

  render: function () {
    var features = this.state.model
      , current = this.state._route
      , items = [['All', '']]
      , dropdown = false
      , newb_class = 'features__new'
    if (features && features.length) {
      for (var i=0; i<features.length; i++) {
        items.push([features[i].name, features[i].id])
      }
      dropdown = DropDown({
        className: 'features__dropdown',
        onChange: this.goTo,
        value: current,
        items: items
      })
    } else {
      if (current === 'new') {
        newb_class += ' features__new--making'
      } else {
        newb_class += ' features__new--nofeatures'
      }
    }


    return (
      <div className='features'>
        <div className='features__header'>
          {dropdown}
          <button className={newb_class} onClick={this.goTo.bind(null, 'new', false, false)}>Add a Feature</button>
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
          <ResultsBar dao={this.props.ctx.dao} pid={this.props.ctx.pid} feature={this.state._route}/>
        </div>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

