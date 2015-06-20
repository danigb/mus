/** @jsx React.DOM */

var React = require('react/addons')

var Player = React.createClass({
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
          <div>
            <span className='bb-artist'>Artist</span> -
            <span className='bb-album'>Album</span>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Player
