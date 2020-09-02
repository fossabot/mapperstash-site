const ItemModel = require('../models/items.js')

function queryFilter(query, includes, excludes) {
  if (includes) query.where('tags').all(includes)
  if (excludes) query.where('tags').nin(excludes)
}

async function countQuery(includes, excludes) {
  var query = ItemModel.countDocuments()

  queryFilter(query, includes, excludes)

  return query.exec()
}

async function estimatedCount() {
  return ItemModel.estimatedDocumentCount()
}

async function itemQuery(pagination, includes, excludes) {
  var query = ItemModel.find()

  queryFilter(query, includes, excludes)

  if (pagination.page && pagination.size) query.skip((pagination.page - 1) * pagination.size)

  if (pagination.size) query.limit(pagination.size)

  return query.populate('tags').exec()
}

async function tagUses(tag) {
  return ItemModel.countDocuments().where('tags').all(tag).exec()
}

async function create(name, url, tags) {
  return ItemModel.create({name: name, url: url, tags: tags})
}

module.exports.queryFilter = queryFilter
module.exports.countQuery = countQuery
module.exports.estimatedCount = estimatedCount
module.exports.itemQuery = itemQuery
module.exports.tagUses = tagUses
module.exports.create = create
