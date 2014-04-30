
var Main = require('./pages/index.jsx')
  , dao = require('./back/test')()

React.renderComponent(Main({
  dao: dao
}), document.getElementById('main'))

