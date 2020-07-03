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

  page += getTemplate('./resources/views/home.tpl', {"itemcount": itemcount})
  page += getTemplate('./resources/views/foot.tpl')

  client.close()
  res.send(page)
})

app.get('/item', (req, res) => {
  res.send(req.query.itemid)
})

app.get('/register', (req, res) => {
  var page = getTemplate('./resources/views/register.tpl')

  res.send(page)
})

app.get('/login', (req, res) => {
  res.send('login')
})

app.get('/users', (req, res) => {
  res.send('users')
})

app.get('/user', (req, res) => {
  res.send(req.query.userid)
})

app.get('/submit', (req, res) => {
  res.send('submit')
})

app.get('/items', async (req, res) => {
  const client = new mongoclient(config.mongodb.url, config.mongodb.opts)
  await client.connect()
  const db = client.db(config.mongodb.db)

  var filters
  var query = '.find(queryobj)'
  var queryobj = {}
  if (req.query.tags) {
    filters = req.query.tags.split('+')
    queryobj.tags = { $all: filters}
  }

  const itemcount = await db.collection('items').countDocuments(queryobj)
  const pages = Math.ceil(itemcount / 10)

  if (req.query.page) {
    if (!(Number.isInteger(Number(req.query.page))) || req.query.page < 1) return res.send("Error")
    query += `.skip(${(req.query.page - 1) * 10})`
  }
  query += '.limit(10).toArray()'

  const results = (await eval(`db.collection('items')${query}`))

  let page = getTemplate('./resources/views/head.tpl')
  page += getTemplate('./resources/views/header.tpl')
  page += getTemplate('./resources/views/itemsearch.tpl')

  results.forEach(result => {
    const link = `/item/${result._id}`
    let tagfrag = '<ul class="searchtags">'
    result.tags.forEach(tag => {
      tagfrag += `<li>${tag}</li>`
    })
    tagfrag += '</ul>'

    page += getTemplate('./resources/views/itemresult.tpl', {"link": link, "text": result.name, "url": result.url, "tags": tagfrag})
  })

  const currentpage = Number(req.query.page) || 1

  page += getTemplate('./resources/views/itempagination.tpl', {"currentpage": currentpage, "lastpage": pages})
  page += getTemplate('./resources/views/foot.tpl')

  client.close()
  res.send(page)
})

app.listen(3000)
