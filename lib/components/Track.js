var React = require('react/addons')

var Track = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    file: React.PropTypes.string
  },
  render: function () {
    return (
      <div className='track'>
        <div className='title'>
          {this.props.title}
        </div>
        <div className='file'>
          {this.props.file}
        </div>
      </div>
    )
  }
})

module.exports = Track
