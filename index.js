const express = require('express')
const mongoclient = require('mongodb').MongoClient
const fs = require('fs')
const config = require('./config.json')

const app = express()

function getTemplate (path, p) {
  const template = fs.readFileSync(path)
  return new Function('p',`return \`${template}\``)(p)
}

app.use(express.static('public'))

app.get('/', async (req, res) => {
  const client = new mongoclient(config.mongodb.url, config.mongodb.opts)
  await client.connect()
  const db = client.db(config.mongodb.db)

  let page = getTemplate('./resources/views/head.tpl')
  page += getTemplate('./resources/views/header.tpl')

  const itemcount = await db.collection('items').countDocuments()
  const tagcount = await db.collection('tags').countDocuments()

  page += getTemplate('./resources/views/home.tpl', {"itemcount": itemcount, "tagcount": tagcount})
  page += getTemplate('./resources/views/foot.tpl')

  client.close()
  res.send(page)
})

app.get('/item/:itemid', (req, res) => {
  res.send(req.params.itemid)
})

app.get('/tags', (req, res) => {
  res.send('tags')
})

app.get('/tag/:tagid', (req, res) => {
  res.send(req.params.tagid)
})

app.get('/access', (req, res) => {
  res.send('access')
})

app.get('/users', (req, res) => {
  res.send('users')
})

app.get('/user/:userid', (req, res) => {
  res.send(req.params.userid)
})

app.get('/submit', (req, res) => {
  res.send('submit')
})

app.get('/items/(:tags)?', async (req, res) => {
  if (!req.params.tags) return res.send('placeholder')

  const client = new mongoclient(config.mongodb.url, config.mongodb.opts)
  await client.connect()
  const db = client.db(config.mongodb.db)

  var filters = req.params.tags.split('+')

  const results = (await db.collection('items').find({ tags: { $all: filters } }).toArray())

  res.send(results)
})

app.listen(3000)
