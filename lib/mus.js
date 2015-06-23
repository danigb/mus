var Search = require('./search.js')
var Server = require('./server.js')

module.exports = Mus

var PORT = 2345

function Mus (root, config, readline) {
  this.root = root
  this.config = config
  this.search = new Search()
  this.server = new Server(config.root, PORT)
  this.readline = readline
  console.log('MUS', this.config)
}

Mus.prototype.exit = function () {
  console.log('Bye!')
  this.readline.close()
  process.exit(0)
}
Mus.prototype.exec = function (string) {
  var cmd
  var args = string ? string.split(/\s+/) : []
  if (args.length === 0) {
    cmd = this.prompt
  } else if (args[0] === 'q' || args[0] === 'exit' || args[0] === 'bye') {
    cmd = this.exit
  } else {
    var name = args.shift()
    cmd = Mus.cmd[name] || this.prompt
  }
  cmd.call(this, args, this, this.exec.bind(this))
}
Mus.prototype.prompt = function () {
  this.readline.question('So? ', this.exec.bind(this))
}

Mus.cmd = require('./commands.js')
