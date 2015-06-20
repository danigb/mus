var exec = require('child_process').exec
var path = require('path')

module.exports = search

function search (args, mus, done) {
  var searchPattern = args.join(' ')
  if (/^\s*$/.test(searchPattern)) throw Error('No search term!')
  console.log('SEARCH: ' + searchPattern)

  var index = path.join(mus.root, mus.config.index)
  var cmd = 'cat ' + index + " | grep -i '" + searchPattern + "' | grep mp3"
  console.log(cmd)
  exec(cmd, function (err, stdout, stderr) {
    if (err) throw err
    stdout.split('\n').forEach(function (file) {
      mus.results.addFile(file)
    })
    done('list')
  })
}
