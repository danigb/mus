var React = require('react/addons')
var Track = require('./Track')

var TrackList = React.createClass({
  render: function () {
    var trackNodes = this.props.tracks.map(function (track, index) {
      return (
        <Track key={'track-' + index} title={track.title} file={track.file} />
      )
    })
    return (
      <div className='trackList'>
        {trackNodes}
      </div>
    )
  }
})

module.exports = TrackList
