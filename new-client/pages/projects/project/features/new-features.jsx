/** @jsx React.DOM */

var NewFeature = module.exports = React.createClass({
  displayName: 'NewFeature',
  getInitialState: function () {
    return {
      type: null,
      loading: false
    }
  },
  onFeatureType: function (type) {
    if (this.state.loading) return
    this.setState({
      type: type,
    })
  },
  onCreate: function (args) {
    if (this.state.loading) return
    this.props.dao.createFeature(this.state.type, args, function (err, id) {
      if (err) return this.setState({error: err, loading: false})
      this.props.goTo(id)
    }.bind(this))
    this.setState({
      loading: 'Creating...'
    })
  },
  render: function () {
    if (this.state.loading) {
      return (
        <div className='new-feature new-feature--loading'>
          {this.state.loading}...
        </div>
      )
    }
    return (
      <div className='new-feature'>
        <FeatureTypePicker onChange={this.onFeatureType}/>
        {this.state.loading && this.state.loading + '...'}
        {this.state.error && 'Error: ' + this.state.error}
        {this.state.type && FeatureEditor({
          type: this.state.type,
          buttonText: 'Create',
          onApply: this.onCreate,
          disabled: !!this.state.loading
        })}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

