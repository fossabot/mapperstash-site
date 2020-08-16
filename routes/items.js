const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const config = require('./../config.json')

router.get('/items', async (req, res) => {
  const ItemModel = require('../models/items.js')
  const TagModel = require('../models/tags.js')
  var querytags, includes, excludes
  if (req.query.tags) {
    querytags = req.query.tags.split(' ')

    if (querytags.some(querytag => querytag.startsWith('-'))) {
      excludes = querytags.filter(querytag => querytag.startsWith('-'))
      excludes = excludes.map(exclude => {return exclude.substring(1)})
      querytags = querytags.filter(querytag => !(querytag.startsWith('-')))
    }
    if (querytags.length) {
      includes = querytags
    }

    if (includes) {
      includes = await Promise.all(includes.map(async include => {
        return TagModel.findOne({ tag: include }).exec()
      }))
      includes = includes.map(include => {return include.id})
    }

    if (excludes) {
      excludes = await Promise.all(excludes.map(async exclude => {
        return TagModel.findOne({ tag: exclude }).exec()
      }))
      excludes = excludes.map(exclude => {return exclude.id})
    }
  }

  var countquery = ItemModel.countDocuments()

  if (includes) countquery.where('tags').all(includes)
  if (excludes) countquery.where('tags').nin(excludes)

  const itemcount = await countquery.exec()
  const pagesize = 10
  const pages = Math.ceil(itemcount / pagesize)

  var pagequery = ItemModel.find()

  if (req.query.page) {
    if (!(Number.isInteger(Number(req.query.page))) || req.query.page < 1) return res.send("Error")
    pagequery.skip((req.query.page - 1) * pagesize)
  }
  pagequery.limit(pagesize)

  if (includes) pagequery.where('tags').all(includes)
  if (excludes) pagequery.where('tags').nin(excludes)

  var pageresults = await pagequery.exec()

  res.render('items.ejs', {items: pageresults, lastpage: pages, currentpage: itemcount})
})

module.exports = router
