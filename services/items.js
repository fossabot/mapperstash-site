const ItemModel = require('../models/items.js')

function querytagsParse(querytags) {
  var excludes, includes

  if (querytags.some(querytag => querytag.startsWith('-'))) {
    excludes = querytags.filter(querytag => querytag.startsWith('-'))
    excludes = excludes.map(exclude => {return exclude.substring(1)})
    querytags = querytags.filter(querytag => !(querytag.startsWith('-')))
  }
  if (querytags.length) includes = querytags

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

async function itemQuery(pagination, includes, excludes) {
  var query = ItemModel.find()

  queryFilter(includes, excludes)

  if (pagination.page && pagination.size) query.skip((pagination.page - 1) * pagination.size)

  if (pagination.size) query.limit(pagination.size)

  return await query.populate('tags').exec()
}

async function tagUses(tag) {
  return await ItemModel.countDocuments().where('tags').all(tag).exec()
}

module.exports.querytagsParse = querytagsParse
module.exports.queryFilter = queryFilter
module.exports.countQuery = countQuery
module.exports.estimatedCount = estimatedCount
module.exports.itemQuery = itemQuery
module.exports. tagUses = tagUses