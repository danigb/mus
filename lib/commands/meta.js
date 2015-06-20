var path = require('path')
var Album = require('../album.js')

module.exports = meta

function meta (args, mus, done) {
  var folder = mus.search.getFolderByNum(args[0])

  var album = new Album(path.join(mus.config.root, folder.path))
  album.getMeta(function (err, meta) {
    if (err) throw (err)

    console.log('META', meta)
    done()
  })
}
