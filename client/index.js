
var App = require('./app.jsx')
  , Dao = require('./test-dao')

React.renderComponent(App({
  dao: new Dao(100),
}), document.body);

