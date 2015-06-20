var express = require('express')
var path = require('path')
var React = require('react/addons')
require('node-jsx').install()
var ReactApp = React.createFactory(require('../components/ReactApp'))

module.exports = server

var PORT = 2345

function server (args, mus, done) {
  console.log('SERVER', args)
  if (!mus.server) mus.server = createServer(mus.root, PORT)

  var exit = mus.exit
  mus.exit = function () {
    if (mus.server) {
      console.log('Stoping server...', mus.server)
      mus.server.close()
    }
    exit.call(this)
  }

  done()
}

function createServer (root, port) {
  var app = express()
  app.use(express.static(path.join(__dirname, 'assets')))
  app.use('/media', express.static(root))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')

  createRoutes(app)

  app.listen(port)
  console.log('Server ready at http://localhost:' + port + '/')
  return app
}

function createRoutes (app) {
  app.get('/', function (req, res) {
    var reactHtml = React.renderToString(ReactApp({}))
    res.render('index.ejs', { reactOutput: reactHtml })
  })

  app.get('*', function (req, res) {
    res.json({ 'route': 'Sorry this page does not exist!' })
  })
}
