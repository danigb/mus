/** @jsx React.DOM */

var React = require('react/addons')

var Player = require('./Player')
var TrackList = require('./TrackList')

var ReactApp = React.createClass({
  render: function () {
    return (
      <div>
        <h1>{this.props.album.title}</h1>
        <Player source={this.props.source} album={this.props.album} />
        <TrackList tracks={this.props.album.tracks} />
      </div>
    )
  }
})

module.exports = ReactApp
