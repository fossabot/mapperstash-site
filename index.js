const express = require('express')
const mongoclient = require('mongodb').MongoClient
const fs = require('fs')
const config = require('./config.json')

const app = express()

function getTemplate (path, p) {
  const template = fs.readFileSync(path)
  return new Function('p',`return \`${template}\``)(p)
}

let mongourl = 'mongodb://'
if (config.mongodb.user) mongourl += config.mongodb.user
if (config.mongodb.password) mongourl += `:${config.mongodb.password}`
if (config.mongodb.user) mongourl += '@'
mongourl += config.mongodb.host
if (config.mongodb.port) mongourl += `:${config.mongodb.port}`

const mongoopts = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(express.static('public'))

app.get('/', async (req, res) => {
  const client = new mongoclient(mongourl, mongoopts)
  await client.connect()
  const db = client.db('mapperstash')

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
  if (!req.params.tags) return

  const client = new mongoclient(mongourl, mongoopts)
  await client.connect()
  const db = client.db('mapperstash')

  let selectors, tagids = []
  selectors = req.params.tags.split('+')

  selectors.forEach(selector => {
    tagids.push(await client.collection('tags').find({ tag: selector }))
  })
})

app.listen(3000)
