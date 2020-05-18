const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/item/:itemid', function (req, res) {
  res.send(req.params.itemid)
})

app.get('/search/:tags', function (req, res) {
  res.send(req.params.tags)
})

app.listen(3000)
