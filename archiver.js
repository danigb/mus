var exec = require('child_process').exec
var path = require('path')
var Results = require('./results.js')

module.exports = Archiver

function Archiver (config, readline) {
  this.config = config
  this.results = new Results()
  this.readline = readline
  console.log('MUS', this.config)
}

Archiver.prototype.exit = function (args) {
  console.log('Bye!')
  this.readline.close()
  return false
}

Archiver.prototype.search = function (args) {
  var searchPattern = args.join(' ')
  if (/^\s*$/.test(searchPattern)) throw Error('No search term!')
  console.log('SEARCH: ' + searchPattern)

  var index = path.join(__dirname, this.config.index)
  var cmd = 'cat ' + index + ' | grep -i ' + searchPattern + ' | grep mp3'
  var self = this
  exec(cmd, function (err, stdout, stderr) {
    if (err) throw err
    stdout.split('\n').forEach(function (file) {
      self.results.addFile(file)
    })
    self.list()
    self.prompt()
  })
}
Archiver.prototype.list = function (args) {
  var folder
  var self = this
  this.results.keys.forEach(function (path, index) {
    folder = self.results.getFolder(path)
    console.log(index + 1 + ' | ' + folder.title)
  })
  return true
}
Archiver.prototype.info = function (args) {
  var folder = this.results.getFolderByNum(args[0])
  console.log(folder)
  return true
}

function escapeFile (name) {
  return name.replace(/[ ,()]/g, function (match) {
    return '\\' + match
  })
}

Archiver.prototype.open = function (args) {
  console.log('OPEN', args)
  var folder = this.results.getFolderByNum(args[0])
  var fullPath = escapeFile(path.join(this.config.root, folder.path))
  console.log('open', fullPath)

  exec('open ' + fullPath, function () {
    console.log('OPEN', folder.title)
  })
  return false
}

Archiver.prototype.prompt = function (args) {
  if (args) console.log('mmm...', args)

  var self = this
  this.readline.question('So? ', function (answer) {
    var cmd
    var args = answer.split(/\s+/)
    if (args.length === 0) {
      cmd = self.prompt
    } else if (args[0] == +args[0]) {
      cmd = self.open
    } else {
      var name = args.shift()
      cmd = self[name] || self.prompt
    }

    if (cmd.call(self, args)) {
      self.prompt()
    } else {
      self.exit()
    }
  })
  return false
}
