var express = require('express')
var path = require('path')
var React = require('react/addons')
require('node-jsx').install()
var ReactApp = React.createFactory(require('./components/ReactApp'))

var Album = require('./album.js')

module.exports = Server

function Server (root, port) {
  this.root = root
  this.port = port
  this.running = false
  this.url = 'http://localhost:' + port + '/'
}

Server.prototype.start = function (done) {
  done = done || function () {}
  if (this.running) done()

  if (!this.app) {
    this.app = express()
    this.app.use(express.static(path.join(__dirname, 'assets')))
    this.app.use('/media', express.static(this.root))
    this.app.set('views', path.join(__dirname, 'views'))
    this.app.set('view engine', 'ejs')
    createRoutes(this.root, this.app)
  }

  var self = this
  this.app.listen(this.port, function () {
    self.running = true
    console.log('Server ready at ' + self.url)
    done()
  })
}

Server.prototype.stop = function () {
  if (this.running) {
    this.server.close()
    this.running = false
  }
}

function createRoutes (root, app) {
  app.get('*', function (req, res) {
    var pathName = decodeURI(req.path)
    var source = '/media/' + pathName + '/'
    new Album(path.join(root, pathName)).getMeta(function (err, meta) {
      if (err) throw err
      var reactHtml = React.renderToString(ReactApp({ source: source, album: meta }))
      res.render('index.ejs', { path: path, album: meta, reactOutput: reactHtml })
    })
  })

  // app.get('*', function (req, res) {
  //   res.json({ 'route': 'Sorry this page does not exist!' })
  // })
}
