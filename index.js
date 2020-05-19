const express = require('express')
const mariadb = require('mariadb')
const fs = require('fs')

const app = express()

function getTemplate (path) {
  const template = fs.readFileSync(path)
  return new Function(`return \`${template}\``)()
}

app.get('/', function (req, res) {
  const page = getTemplate('./resources/views/head.tpl') + getTemplate('./resources/views/homepage.tpl') 
  res.send(page)
})

app.get('/item/:itemid', function (req, res) {
  res.send(req.params.itemid)
})

app.get('/search/:tags', function (req, res) {
  res.send(req.params.tags)
})

app.listen(3000)
