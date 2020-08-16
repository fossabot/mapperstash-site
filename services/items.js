const ItemModel = require('../models/items.js')

function querytagsParse(querytags) {
  var excludes, includes

  if (querytags.some(querytag => querytag.startsWith('-'))) {
    excludes = querytags.filter(querytag => querytag.startsWith('-'))
    excludes = excludes.map(exclude => {return exclude.substring(1)})
    querytags = querytags.filter(querytag => !(querytag.startsWith('-')))
  }
  if (querytags.length) {
    includes = querytags
  }

  return {includes: includes, excludes: excludes}
}

function queryFilter(query, includes, excludes) {
  if (includes) query.where('tags').all(includes)
  if (excludes) query.where('tags').nin(excludes)
}

async function countQuery(includes, excludes) {
  var query = ItemModel.countDocuments()

  queryFilter(query, includes, excludes)

  return await query.exec()
}

async function estimatedCount() {
  return await ItemModel.estimatedDocumentCount()
}

async function itemQuery(page, pagesize, includes, excludes) {
  var pagequery = ItemModel.find()

  queryFilter(includes, excludes)

  if (page) pagequery.skip((page - 1) * pagesize)

  pagequery.limit(pagesize)

  return await pagequery.populate('tags').exec()
}

module.exports.querytagsParse = querytagsParse
module.exports.queryFilter = queryFilter
module.exports.countQuery = countQuery
module.exports.estimatedCount = estimatedCount
module.exports.itemQuery = itemQuery
