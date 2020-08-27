const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/tags', async (req, res) => {
  const TagService = require('../services/tags.js')
  const ItemService = require('../services/items.js')

  const searchText = req.query.text || ''

  const itemcount = await TagService.tagTextCount(searchText)

  var pagination = {}
  pagination.size = Number(req.query.size) || 10
  pagination.page = req.query.page || 1
  pagination.pages = Math.ceil(itemcount / pagination.size)

  if (req.query.page) {
    if (!(Number.isInteger(Number(req.query.page))) || req.query.page < 1) return res.send('Error')
  }

  const pageresults = await TagService.tagTextSearch(pagination, searchText)

  await Promise.all(pageresults.map(async result => {
    result.uses = await ItemService.tagUses(result.id)
  }))

  res.render('tags.ejs', {items: pageresults, pagination: pagination, resultcount: itemcount})
})

module.exports = router
