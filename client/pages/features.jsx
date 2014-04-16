
var ModelMix = require('./modelmix')
  , FeatureTable = require('./feature-table.jsx')
  , FeatureEditor = require('./feature-editor.jsx')

var FeaturesPage = module.exports = React.createClass({
  displayName: 'FeaturesPage',
  mixins: [ModelMix],
  getInitialState: function () {
    return {
      editing: null
    }
  },
  model: function () {
    return this.props.dao.getFeatureOutput(this.props.pid)
  },
  editFeature: function (fid) {
    this.setState({
      editing: fid
    })
  },
  showEditFeature: function () {
    if (null === this.state.editing) return
    var fid = this.state.editing
      , feature = null
      , features = this.state.model.features
    for (var i=0; i<features.length; i++) {
      if (features[i].id === fid) {
        feature = features[i]
        break
      }
    }
    if (feature === null) return
    return (
      <div className='selected-feature'>
        Editing a feature!!
        {FeatureEditor({
          id: fid,
          value: feature
        })}
      </div>
    )
  },
  render: function () {
    if (!this.state.model) {
      return <div className='features features--loading'>Loading...</div>
    }
    return (
      <div className='features'>
        {this.showEditFeature()}
        <div className='features__table'>
          {FeatureTable({
            editFeature: this.editFeature,
            selected: this.state.editing,
            data: this.state.model.data,
            classes: this.state.model.classes,
            features: this.state.model.features
          })}
        </div>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

