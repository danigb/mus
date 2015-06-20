/** @jsx React.DOM */

var React = require('react/addons')

var Player = require('./Player')

var ReactApp = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Player</h1>
        <Player />
      </div>
    )
  }
})

module.exports = ReactApp
