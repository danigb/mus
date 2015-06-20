module.exports = list

function list (args, mus, done) {
  var folder
  mus.search.paths.forEach(function (path, index) {
    folder = mus.search.getFolder(path)
    console.log(index + 1 + ' | ' + folder.title)
  })
  done()
}
