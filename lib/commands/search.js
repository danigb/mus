var path = require('path')
var Search = require('../search.js')

module.exports = search

function search (args, mus, done) {
  var searchPattern = args.join(' ')
  console.log('SEARCH: ' + searchPattern)

  var index = path.join(mus.root, mus.config.index)
  mus.search = new Search(index, searchPattern, function (err, results) {
    if (err) throw err
    done('list')
  })
}
