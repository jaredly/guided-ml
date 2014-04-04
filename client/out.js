(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var App = module.exports = React.createClass({displayName: 'exports',
  getDefaultProps: function () {
    return {
      dao: null
    }
  },
  getInitialState: function () {
    return {
      projects: null
    }
  },
  loading: function () {
    return React.DOM.div( {className:"loading"}, "Loading...")
  },
  render: function () {
    if (!this.state.projects) {
      return this.loading()
    }
  }
})


},{}],2:[function(require,module,exports){

var App = require('./app.jsx')

React.renderComponent(App({
}), document.body);


},{"./app.jsx":1}]},{},[2])