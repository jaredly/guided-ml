/** @jsx React.DOM */

var Tooltip = require('./tooltip.jsx')

var BarGraph = module.exports = React.createClass({
  displayName: 'BarGraph',
  getDefaultProps: function () {
    return {
      data: [],
      labels: [],
      onSelect: function (what, i) {console.log('selected', what, i)}
    }
  },
  getInitialState: function () {
    return {
      pos: {top: 0, left: 0},
      tipping: false,
      tipText: ''
    }
  },
  onMouseOver: function (num, i, e) {
    this.setState({
      pos: {
        top: e.pageY,
        left: e.pageX,
      },
      tipText: this.props.labels[i] + ': ' + num,
      tipping: true
    })
  },
  onMouseOut: function () {
    this.setState({tipping: false})
  },
  onMouseMove: function (e) {
    this.setState({pos:{top: e.pageY, left: e.pageX}})
  },
  render: function () {
    var max = Math.max.apply(Math, this.props.data)
      , onSelect = this.props.onSelect
      , mouseOver = this.onMouseOver
      , mouseOut = this.onMouseOut
      , mouseMove = this.onMouseMove
    return (
      <div className='bar-graph'>
        <div className='bar-graph_bars'>
          {
            this.props.data.map(function (num, i) {
              return (
                <div key={i}
                    className='bar-graph_bar-container'
                    onMouseOver={mouseOver.bind(null, num, i)}
                    onMouseMove={mouseMove}
                    onMouseOut={mouseOut}
                    onClick={onSelect.bind(null, num, i)}>
                  <div className='bar-graph_bar' style={{
                    height: (num * 100 / max) + '%',
                    backgroundColor: 'blue'
                  }} />
                </div>
              )
            })
          }
        </div>
        <div className='bar-graph_labels'>
          {
            this.props.labels.map(function (name, i) {
              return <div key={i} className='bar-graph_lab'><div className='bar-graph_label'>{name}</div></div>
            })
          }
        </div>
        <Tooltip pos={this.state.pos} showing={this.state.tipping}>
          {this.state.tipText}
        </Tooltip>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

