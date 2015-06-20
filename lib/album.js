var id3 = require('id3js')
var fs = require('fs')
var path = require('path')
var minimatch = require('minimatch')

module.exports = Album

function Album (path) {
  this.path = path.toString()
}

Album.prototype.getMeta = function (cb) {
  this.createMeta(cb)
}
Album.prototype.createMeta = function (cb) {
  var meta = { path: this.path, tracks: [], trackCount: 0, assets: [] }

  fs.readdirSync(this.path).forEach(function (file) {
    if (minimatch(file, '*.+(mp3|mp4|wav|ogg)')) {
      meta.tracks.push({ file: file })
      meta.trackCount++
    } else {
      meta.assets.push(file)
    }
  })

  var root = this.path
  var pending = 0
  meta.tracks.forEach(function (track) {
    if (!minimatch(track.file, '*.+(mp3|mp4)')) return
    pending++
    id3({ file: path.join(root, track.file), type: id3.OPEN_LOCAL }, function (err, tags) {
      if (err) cb(err)
      track.title = cleanString(tags.title)
      track.artist = cleanString(tags.artist)
      track.album = cleanString(tags.album)
      track.year = cleanString(tags.year)
      if (--pending === 0) cb(null, meta)
    })
  })

  if (pending === 0) cb(null, meta)
}

function cleanString (str) {
  return str.replace(/\\u0000/g, '')
}
