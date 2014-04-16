
var ModelMix = require('./modelmix')
  , FeatureTable = require('./feature-table.jsx')
  , FeatureEditor = require('./feature-editor.jsx')

function merge(a, b) {
  for (var c in b) {
    a[c] = b[c]
  }
  return a
}

function changeCol(data, ix, col) {
  for (var i=0; i<col.length; i++) {
    data[i][ix] = col[i]
  }
}

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
  changeFeature: function (fid, fix, data) {
    var that = this
    this.props.dao.changeFeature(this.props.pid, fid, data).then(function (result) {
      var model = that.state.model
      merge(model.features[fix], data)
      changeCol(model.data, fix + 2, result)
      that.setState({
        model: model
      })
    }, function (err) {
      console.error('fail!', err)
      // that.setState({modelError:
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
        {FeatureEditor({
          id: fid,
          onChange: this.changeFeature.bind(null, fid, i),
          onClose: this.editFeature.bind(null, null),
          model: this.state.model,
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
        {FeatureTable({
            editFeature: this.editFeature,
            selected: this.state.editing,
            data: this.state.model.data,
            classes: this.state.model.classes,
            features: this.state.model.features
          })}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

