module.exports = info

function info (args, mus, done) {
  var folder = mus.results.getFolderByNum(args[0])
  console.log(folder)
  done()
}
