'use strict'

var exec = require('child_process').exec
var path = require('path')

var Album = require('./album.js')
var Search = require('./search.js')

var COMMANDS = {}

/*
 * FOLDER: open finder with the selected folder
 */
function folder (args, mus, done) {
  var folder = mus.search.getFolderByNum(args[0])
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
COMMANDS.folder = COMMANDS.f = folder

/*
 * INFO: show mp3 files inside the selected folder from search results
 */
function info (args, mus, done) {
  var folder = mus.search.getFolderByNum(args[0])
  console.log(folder)
  done()
}
COMMANDS.info = COMMANDS.i = info

/*
* LIST: list search results folders
*/
function list (args, mus, done) {
  var folder
  mus.search.paths.forEach(function (path, index) {
    folder = mus.search.getFolder(path)
    console.log(index + 1 + ' | ' + folder.title)
  })
  done()
}
COMMANDS.list = COMMANDS.l = list

/*
* META: show album metadata information of the selected folder
*/
function meta (args, mus, done) {
  var folder = mus.search.getFolderByNum(args[0])

  var album = new Album(path.join(mus.config.root, folder.path))
  album.getMeta(function (err, meta) {
    if (err) throw (err)

    console.log('META', meta)
    done()
  })
}
COMMANDS.meta = meta

/*
 * OPEN: open the web player with the selected folder
 */
function open (args, mus, done) {
  var folder = mus.search.getFolderByNum(args[0])

  mus.server.start(function () {
    var url = mus.server.url + folder.path.substring(2)
    console.log('OPEN', url)
    exec('open "' + url + '"', function () {
    })
    done()
  })
}
COMMANDS.open = COMMANDS.o = open

/*
 * SEARCH: search mp3 and group by folders
 */
function search (args, mus, done) {
  var searchPattern = args.join(' ')
  console.log('SEARCH: ' + searchPattern)

  var index = path.join(mus.root, mus.config.index)
  mus.search = new Search(index, searchPattern, function (err, results) {
    if (err) throw err
    done('list')
  })
}
COMMANDS.search = COMMANDS.s = search

/*
 * SERVER: start a server
 */
function server (args, mus, done) {
  console.log('SERVER', args)
  mus.server.start(function() {
    done()
  })
}
COMMANDS.server = server

module.exports = COMMANDS
