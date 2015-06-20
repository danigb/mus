var express = require('express')
var path = require('path')

module.exports = server

var PORT = 2345

function server (args, mus, done) {
  console.log('SERVER', args)
  if (!mus.app) mus.app = createServer(mus.root, PORT)

  var exit = mus.exit
  mus.exit = function() {
    if (mus.app) mus.app.close()
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
    res.render('index.ejs', { reactOuput: 'hi'})
  })

  app.get('*', function (req, res) {
    res.json({ 'route': 'Sorry this page does not exist!' })
  })
}
