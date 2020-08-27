const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

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

  res.render('users.ejs', {items: pageresults, pagination: pagination, resultcount: itemcount})
})

module.exports = router
