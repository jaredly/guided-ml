
var _ = require('lodash')
  , LEARNERS = require('../learners').LEARNERS

var LearnerEditor = module.exports = React.createClass({
  displayName: 'LearnerEditor',
  getDefaultProps: function () {
    return {
      value: null,
      onChange: function () {throw 'override'},
      onRemove: function () {throw 'override'},
    }
  },
  getInitialState: function () {
    return {
      data: _.cloneDeep(this.props.value)
    }
  },
  componentWillReceiveProps: function (props) {
    this.setState({data: _.cloneDeep(props.value)})
  },
  onApply: function () {
    this.props.onChange(this.state.data)
  },
  changeAttr: function (attr, e) {
    var data = _.cloneDeep(this.state.data)
    data[attr] = e.target.value
    this.setState({data: data})
  },
  changeArg: function (arg, e) {
    var data = _.cloneDeep(this.state.data)
    data.args[arg] = e.target.value
    this.setState({data: data})
  },
  argWidget: function (name, arg, value) {
    if ('string' === typeof arg) {
      arg = {type: arg}
    }
    var change = this.changeArg.bind(null, name)
    var input
    if (arg.type === 'str-multi') {
      input = React.DOM.textarea({
        onChange: change,
        value: value,
      })
    } else if (arg.type === 'int') {
      input = React.DOM.input({
        onChange: change,
        value: value,
        type: 'text'
      })
    } else {
      input = "No widget for " + arg.type
    }
    return (
      <tr className='arg-widget'>
        <td className='arg-widget__key'>{name}</td>
        <td>{input}</td>
      </tr>
    )
  },
  render: function () {
    var ltype = LEARNERS[this.state.data.type]
      , args = Object.keys(ltype.args)
      , that = this
    return (
      <div className='learner-editor'>
        <input type="text" className='learner-editor__name' value={this.state.data.name} onChange={this.changeAttr.bind(null, 'name')}/>
        <table className='learner-editor__attrs'>
          {
            args.map(function (name) {
              return that.argWidget(name, ltype.args[name], that.state.data.args[name])
            })
          }
        </table>
        <button onClick={this.onApply} className='learner-editor__apply'>Apply</button>
        <button onClick={this.props.onRemove} className='learner-editor__remove'>Remove</button>
      </div>
    )
  }
});

