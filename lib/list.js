module.exports = list

function list (args, mus, done) {
  var folder
  mus.results.keys.forEach(function (path, index) {
    folder = mus.results.getFolder(path)
    console.log(index + 1 + ' | ' + folder.title)
  })
  done()
}
