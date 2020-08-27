const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/items', async (req, res) => {
  const ItemService = require('../services/items.js')
  const TagService = require('../services/tags.js')
  const SearchService = require('../services/search.js')

  var queryParts, includes, excludes
  if (req.query.tags) {
    queryParts = req.query.tags.split(' ')

    ;({includes, excludes} = TagService.parseTags(queryParts))

    if (includes) includes = await TagService.getIdFromTag(includes)
    if (excludes) excludes = await TagService.getIdFromTag(excludes)
  }

  const itemcount = await ItemService.countQuery(includes, excludes)

  if (req.query.page && !SearchService.validPage(req.query.page)) throw new Error()

  const pagination = SearchService.paginationCalc(itemcount, req.query)

  const pageresults = await ItemService.itemQuery(pagination, includes, excludes)

  res.render('items.ejs', {items: pageresults, pagination: pagination, resultcount: itemcount})
})

module.exports = router
