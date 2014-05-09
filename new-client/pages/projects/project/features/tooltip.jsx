/** @jsx React.DOM */

var Tooltip = module.exports = React.createClass({
  displayName: 'Tooltip',
  render: function () {
    return (
      <div className='tooltip'
          style={{
            top: this.props.pos.top + 5,
            left: this.props.pos.left + 5,
            display: this.props.showing ? 'block' : 'none'
          }}>
        {this.props.children}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

