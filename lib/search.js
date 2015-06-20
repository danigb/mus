var exec = require('child_process').exec
module.exports = Search

var noop = function () {}
function performSearch (search, cb) {
  cb = cb || noop
  if (/^\s*$/.test(search.term)) return cb(null, search)

  var cmd = 'cat ' + search.source + " | grep -i '" + search.term + "' | grep mp3"
  exec(cmd, function (err, stdout, stderr) {
    var lastBar, path, folder, mp3
    if (err) cb(err)
    else {
      stdout.split('\n').forEach(function (file) {
        if (/^\s*$/.test(file)) return
        lastBar = file.lastIndexOf('/')
        path = file.slice(0, lastBar)
        folder = search.getFolder(path)
        mp3 = file.substring(lastBar + 1)
        folder.files.push(mp3)
      })
      cb(null, this)
    }
  })
}

function Search (source, term, cb) {
  this.source = source
  this.term = term
  this.folders = {}
  this.paths = []
  performSearch(this, cb)
}
Search.prototype.getFolder = function (path) {
  var folder = this.folders[path]
  if (!folder) {
    folder = { path: path, files: [] }
    folder.title = path.substring(path.lastIndexOf('/') + 1)
    this.folders[path] = folder
    this.paths.push(path)
  }
  return folder
}
Search.prototype.getFolderByNum = function (numStr) {
  var index = numStr == +numStr ? +numStr - 1 : null
  var folder = index != null ? this.folders[this.paths[index]] : null
  if (!folder) throw Error('Folder not found: ' + numStr)
  return folder
}
