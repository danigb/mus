var exec = require('child_process').exec
var path = require('path')

module.exports = folder

function folder (args, mus, done) {
  var folder = mus.results.getFolderByNum(args[0])
  var fullPath = escapeFile(path.join(mus.config.root, folder.path))
  console.log('FOLDER', fullPath)

  exec('open ' + fullPath, function () {
    console.log('FOLDER', folder.title)
    done('exit')
  })
}

function escapeFile (name) {
  return name.replace(/[ ,()&']/g, function (match) {
    return '\\' + match
  })
}
