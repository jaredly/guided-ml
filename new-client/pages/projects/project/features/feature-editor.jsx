/** @jsx React.DOM */

var features = require("../../../../features.js")

var FeatureEditor = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      name: '',
      type: '',
      args: null,
      buttonText: 'Apply',
      onApply: function () {throw 'override'},
      disabled: false
    }
  },
  getInitialState: function () {
    return {
      name: this.props.name
    }
  },
  /*
  componentWillReceiveProps: function (props) {
    this.setState({
      name: props.name
    })
  },
  */
  changeName: function (e) {
    this.setState({name: e.target.value})
  },
  render: function () {
    return (
      <div className='feature-editor'>
        <div className='feature-editor_top'>
          <input value={this.state.name} onChange={this.changeName}/>
          <button onClick={this.action}>{this.props.buttonText}</button>
        </div>
        Edit a feature here
      </div>
    )
  },
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

