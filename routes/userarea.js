const mongoose = require('mongoose')
const express = require('express')
const bodyparser = require('body-parser')
const router = express.Router()

function filterSession(req, res, next) {
  if (!req.session.user) return res.redirect('/login')
  return next()
}

router.get('/submit', filterSession, async (req, res) => res.render('submit.ejs', {s: req.session}))

router.post('/submit', filterSession, bodyparser.urlencoded({extended: false}), async (req, res) => {
  const ItemService = require('../services/items.js')

  await ItemService.create(req.body)

  res.redirect('/submit')
})

module.exports = router
