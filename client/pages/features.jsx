
var ModelMix = require('./modelmix')
  , FeatureTable = require('./feature-table.jsx')
  , FeatureEditor = require('./feature-editor.jsx')
  , InstancePictures = require('./instance-pictures.jsx')
  , features = require('../features')
  , FEATURES = features.FEATURES

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

function addCol(data, col) {
  for (var i=0; i<col.length; i++) {
    data[i].push(col[i])
  }
}

function removeCol(data, ix) {
  for (var i=0; i<data.length; i++) {
    data[i].splice(ix, 1)
  }
}


var FeaturesPage = module.exports = React.createClass({
  displayName: 'FeaturesPage',
  mixins: [ModelMix],
  getInitialState: function () {
    return {
      editing: null,
      view: 'table',
      sorting: 1,
    }
  },
  model: function () {
    return this.props.dao.getFeatureOutput(this.props.pid)
  },
  toggleView: function () {
    this.setState({
      view: this.state.view === 'pictures' ? 'table' : 'pictures'
    })
  },
  toggleEditing: function (fid) {
    if (this.state.editing === fid) {
      fid = null
    }
    this.setState({
      editing: fid
    })
  },
  removeFeature: function (fid, ix) {
    var that = this
    this.props.dao.removeFeature(this.props.pid, fid).then(function () {
      var model = that.state.model
      model.features.splice(ix, 1)
      removeCol(model.data, ix + 2)
      that.setState({model: model})
    })
  },
  addFeature: function (e) {
    ftype = e.target.value
    if (!FEATURES[ftype]) return
    var that = this
      , name = ftype + ' new ' + ('' + Math.random()).slice(0, 5)
      , args = features.defaultArgs(ftype, this.state.model.headers)
    this.props.dao.addFeature(this.props.pid, ftype, name, args).then(function (result) {
      var model = that.state.model
      model.features.push(result.feature)
      addCol(model.data, result.feature_column)
      that.setState({model: model, editing: result.feature.id})
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
          onClose: this.toggleEditing.bind(null, null),
          onRemove: this.removeFeature.bind(null, fid, i),
          model: this.state.model,
          value: feature
        })}
      </div>
    )
  },
  sortBy: function (i) {
    this.setState({sorting: i})
  },
  view: function () {
    if (this.state.view === 'pictures') {
      return InstancePictures({
        toggleEditing: this.toggleEditing,
        selected: this.state.editing,
        data: this.state.model.data,
        instances: this.state.model.raw_data,
        sorting: this.state.sorting,
        features: this.state.model.features,
        classes: this.state.model.classes,
        baseUrl: '/project/' + this.props.pid,
        sortBy: this.sortBy
      })
    } else {
      return FeatureTable({
        toggleEditing: this.toggleEditing,
        selected: this.state.editing,
        data: this.state.model.data,
        classes: this.state.model.classes,
        features: this.state.model.features,
        sorting: this.state.sorting,
        sortBy: this.sortBy
      })
    }
  },
  render: function () {
    if (!this.state.model) {
      return <div className='features features--loading'>Loading...</div>
    }
    return (
      <div className='features'>
        <select className='features__new' value="Add Feature" onChange={this.addFeature}>
          <option value="Add Feature">Add Feature</option>
          {
            Object.keys(FEATURES).map(function (name) {
              return <option value={name}>{name}</option>
            })
          }
        </select>
        <button className='features__view' onClick={this.toggleView}>
          {this.state.view === 'table' ? 'Pictures' : 'Table'}
        </button>
        {this.showEditFeature()}
        {this.view()
          }
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

