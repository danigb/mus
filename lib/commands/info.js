module.exports = info

function info (args, mus, done) {
  var folder = mus.search.getFolderByNum(args[0])
  console.log(folder)
  done()
}
