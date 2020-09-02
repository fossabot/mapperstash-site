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
  const TagService = require('../services/tags.js')

  const tags = req.body.tags.split(' ')
  console.log(tags)
  const tagIds = await Promise.all(tags.map(async tag => {
    try {
      return TagService.getIdFromTag(tag)
    } catch (e) {
      if (!e.name == 'TypeError') throw new Error()
      return (await TagService.create(tag)).id
    }
  }))
  console.log(tagIds)

  await ItemService.create(req.body.name, req.body.url, tagIds)

  res.redirect('/submit')
})

module.exports = router
