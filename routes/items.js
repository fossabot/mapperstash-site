const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const config = require('./../config.json')

router.get('/items', async (req, res) => {
  const ItemModel = require('../models/items.js')
  const TagModel = require('../models/tags.js')
  var includes, excludes
  var querytags = req.query.tags.split('+')

  if (querytags.some(querytag => querytag.startsWith('-'))) {
    excludes = querytags.filter(querytag => querytag.startsWith('-'))
    querytags = querytags.filter(querytag => !(querytag.startsWith('-')))
  }
  if (querytags.length) includes = querytags

  var countquery = ItemModel.countDocuments({})

  if (req.query.page) {
    
  }
  /*
  const itemcount = await db.collection('items').countDocuments(queryobj)
  const pages = Math.ceil(itemcount / 10)

  if (req.query.page) {
    if (!(Number.isInteger(Number(req.query.page))) || req.query.page < 1) return res.send("Error")
    query += `.skip(${(req.query.page - 1) * 10})`
  }
  query += '.limit(10).toArray()'

  const results = (await eval(`db.collection('items')${query}`)
  */
  res.render('items.ejs', {items:[{name:'a',url:'#',link:'#',tags:['a']}],lastpage:2,currentpage:1})
})

module.exports = router
