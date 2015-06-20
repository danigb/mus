module.exports = Results

function Results () {
  this.clear()
}
Results.prototype.clear = function () {
  this.folders = {}
  this.keys = []
}
Results.prototype.getFolder = function (path) {
  var folder = this.folders[path]
  if (!folder) {
    folder = { path: path, files: [] }
    folder.title = path.substring(path.lastIndexOf('/') + 1)
    this.folders[path] = folder
    this.keys.push(path)
  }
  return folder
}
Results.prototype.addFile = function (file) {
  if (/^\s*$/.test(file)) return
  var lastBar = file.lastIndexOf('/')
  var path = file.slice(0, lastBar)
  var folder = this.getFolder(path)
  var mp3 = file.substring(lastBar + 1)
  folder.files.push(mp3)
}
Results.prototype.getFolderByNum = function (numStr) {
  var index = numStr == +numStr ? +numStr - 1 : null
  var folder = index ? this.folders[this.keys[index]] : null
  if (!folder) throw Error('Folder not found: ' + numStr)
  return folder
}
