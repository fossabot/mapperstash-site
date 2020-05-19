const express = require('express')
const mariadb = require('mariadb')
const fs = require('fs')
const config = require('./config.json')

const app = express()

function getTemplate (path, p) {
  const template = fs.readFileSync(path)
  return new Function('p',`return \`${template}\``)(p)
}

app.use(express.static('public'))

app.get('/', async (req, res) => {
  const conn = await mariadb.createConnection(config.mariadb)
  await conn.query('use mapperstash')

  let page = getTemplate('./resources/views/head.tpl')
  page += getTemplate('./resources/views/header.tpl')

  const itemcount = (await conn.query('select count(*) from items'))[0]['count(*)']
  const tagcount = (await conn.query('select count(*) from tags'))[0]['count(*)']

  page += getTemplate('./resources/views/home.tpl',{"itemcount": itemcount, "tag count": tagcount})
  page += getTemplate('./resources/views/foot.tpl')
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

app.get('/items/:tags', (req, res) => {
  res.send(req.params.tags)
})

app.listen(3000)
