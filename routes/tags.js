const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/tags', async (req, res) => {
  const TagService = require('../services/tags.js')
  const ItemService = require('../services/items.js')
  const SearchService = require('../services/search.js')

  const searchText = req.query.text || ''

  const itemcount = await TagService.tagTextCount(searchText)

  if (req.query.page && !SearchService.validPage(req.query.page)) throw new Error()

  const pagination = SearchService.paginationCalc(itemcount, req.query)

  const pageresults = await TagService.tagTextSearch(pagination, searchText)

  await Promise.all(pageresults.map(async result => {
    result.uses = await ItemService.tagUses(result.id)
  }))

  res.render('tags.ejs', {items: pageresults, pagination: pagination, resultcount: itemcount})
})

module.exports = router
