
var App = require('./app.jsx')
  , Dao = require('./rest-dao')

React.renderComponent(App({
  dao: new Dao(),
}), document.body);

