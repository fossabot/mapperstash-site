const express = require('express')
const session = require('express-session')
const bodyparser = require('body-parser')
const redis = require('redis')
const https = require('https')
const mongoose = require('mongoose')
const fs = require('fs')
const ejs = require('ejs')
const config = require('./config.json')

const app = express()

const RedisStore = require('connect-redis')(session)
const redisclient = redis.createClient()

app.use(session({
  cookie: {
    secure: true
  },
  resave: false,
  store: new RedisStore({host: config.redis.host, port: config.redis.port, client: redisclient}),
  secret: config.session.secret,
  saveUninitialized: false
}))

const routeFiles = fs.readdirSync('./routes').filter(file => file.endsWith('.js'))

for (route of routeFiles) {
  var router = require(`./routes/${route}`)
  app.use('/', router)
}

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(config.mongoose.url, config.mongoose.opts)

app.use(express.static('public'))

app.engine('ejs', ejs.renderFile)
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', async (req, res) => {
  const ItemService = require('./services/items.js')

  res.render('home.ejs', {ic: await ItemService.estimatedCount(), s: req.session})
})

const httpsOpts = {
  key: fs.readFileSync(config.https.key),
  cert: fs.readFileSync(config.https.cert)
}

var httpRedirect = express()
httpRedirect.all('*',(req, res) => {
  res.redirect('https://' + req.headers.host + req.url)
})
httpRedirect.listen(80)

var httpsApp = https.createServer(httpsOpts, app)
httpsApp.listen(443)
