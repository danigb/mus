/** @jsx React.DOM */

var React = require('react/addons')

var Player = React.createClass({
  propTypes: {
    source: React.PropTypes.string,
    album: React.PropTypes.object
  },
  sources: function () {
    var source = this.props.source
    return this.props.album.tracks.map(function (track, index) {
      var filePath = source + track.file
      return <source key={filePath} src={filePath} />
    })
  },
  render: function () {
    return (
      <div className='bbplayer'>
        <span className='bb-rewind'></span>
        <span className='bb-play'></span>
        <span className='bb-forward'></span>
        <div className='playerWindow'>
          <div>
            <span className='bb-trackTime'>--:--</span>
            <span className='bb-trackTitle'>&nbsp;</span>
            <span className='bb-trackLength'>--:--</span>
          </div>
        </div>
        <audio>
          {this.sources()}
        </audio>
      </div>
    )
  }
})

module.exports = Player
