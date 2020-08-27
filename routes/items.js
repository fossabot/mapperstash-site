const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/items', async (req, res) => {
  const ItemService = require('../services/items.js')
  const TagService = require('../services/tags.js')

  var queryParts, includes, excludes
  if (req.query.tags) {
    queryParts = req.query.tags.split(' ')

    ;({includes, excludes} = TagService.parseTags(queryParts))

    if (includes) includes = await TagService.getIdFromTag(includes)
    if (excludes) excludes = await TagService.getIdFromTag(excludes)
  }

  const itemcount = await ItemService.countQuery(includes, excludes)

  var pagination = {}
  pagination.size = Number(req.query.size) || 10
  pagination.page = req.query.page || 1
  pagination.pages = Math.ceil(itemcount / pagination.size)

  if (req.query.page) {
    if (!(Number.isInteger(Number(req.query.page))) || req.query.page < 1) return res.send('Error')
  }

  const pageresults = await ItemService.itemQuery(pagination, includes, excludes)

  res.render('items.ejs', {items: pageresults, pagination: pagination, resultcount: itemcount})
})

module.exports = router
