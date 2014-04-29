/** @jsx React.DOM */

var AllFeatures = require('./all-features.jsx')
  , NewFeature = require('./new-features.jsx')
  , Feature = require('./feature.jsx')

  , Router = require('react-router')

var Features = module.exports = React.createClass({
  displayName: 'Features',
  mixins: [Router],
  routes: {
    '': AllFeatures,
    'new': NewFeature,
    '*': Feature
  },
  render: function () {
    var features = this.state.model
      , current = this.state._route.name
      , items = [['All', '']]
    for (var i=0; i<features.length; i++) {
      items.push([features[i].name, features[i].id])
    }
    items.push(['New', 'new'])
    return (
      <div className='features'>
        <div className='features__header'>
          {DropDown({
            className: 'features__dropdown',
            action: this.goTo,
            value: current,
            items: items
          })}
        </div>
        <div className='features__row'>
          <div className='features__main'>
            {this.outlet()}
          </div>
          {InstanceViewer({
            dao: this.props.dao,
            feature: current,
          })}
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

