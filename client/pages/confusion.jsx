
var Confusion = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      matrix: null,
      classes: null
    }
  },
  render: function () {
    var classes = this.props.classes
    return (
      <table className='confusion'>
        <thead>
          <tr>
            <th></th>
            {
              classes.map(function (name, i) {
                return <th key={i}>{name}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
        {
          this.props.matrix.map(function (row, i) {
            return (
              <tr key={i}>
                <td>{classes[i]}</td>
                {
                  row.map(function (num, i) {
                    return (
                      <td key={i}>{num}</td>
                    )
                  })
                }
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )
  }
})

