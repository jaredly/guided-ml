
module.exports = {
  getInitialState: function () {
    return {model: null, modelError: null}
  },
  componentDidMount: function () {
    var that = this
    this.model().then(function (value) {
      that.setState({model: value})
    }, function (reason) {
      that.setState({modelError: reason, model: null})
    })
  }
}

