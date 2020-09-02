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

    if (includes) includes = await TagService.getIdFromTags(includes)
    if (excludes) excludes = await TagService.getIdFromTags(excludes)
  }

  const itemcount = await ItemService.countQuery(includes, excludes)

  if (req.query.page && !SearchService.validPage(req.query.page)) throw new Error()

  const pagination = SearchService.paginationCalc(itemcount, req.query)

  const pageresults = await ItemService.itemQuery(pagination, includes, excludes)

  res.render('items.ejs', {i: pageresults, p: pagination, ic: itemcount, s: req.session})
})

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

  res.render('tags.ejs', {i: pageresults, p: pagination, ic: itemcount, s: req.session})
})

router.get('/users', async (req, res) => {
  const UserService = require('../services/users.js')
  const SearchService = require('../services/search.js')

  const searchText = req.query.text || ''

  const itemcount = await UserService.userTextCount(searchText)

  if (req.query.page && !SearchService.validPage(req.query.page)) throw new Error()

  const pagination = SearchService.paginationCalc(itemcount, req.query)

  const pageresults = await UserService.userTextSearch(pagination, searchText)

  /*await Promise.all(pageresults.map(async result => {
    result.uses = await ItemService.tagUses(result.id)
  }))*/

  res.render('users.ejs', {i: pageresults, p: pagination, ic: itemcount, s: req.session})
})

module.exports = router
