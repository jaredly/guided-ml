
var Main = require('./pages/index.jsx')
  , Dao = require('./back/test')
  , dao = new Dao()

React.renderComponent(Main({
  dao: dao
}), document.getElementById('main'))

