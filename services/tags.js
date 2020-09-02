const TagModel = require('../models/tags.js')

function parseTags(tags) {
  var excludes, includes

  if (tags.some(tag => tag.startsWith('-'))) {
    excludes = tags.filter(tag => tag.startsWith('-'))
    excludes = excludes.map(exclude => {return exclude.substring(1)})

    tags = tags.filter(tag => !(tag.startsWith('-')))
  }
  if (tags.length) includes = tags

  return {includes: includes, excludes: excludes}
}

async function getIdFromTag(tag) {
  const queriedTag = await TagModel.findOne({ tag: tag }).exec()
  return queriedTag.id
}

async function getIdFromTags(tags) {
  return Promise.all(tags.map(tag => tag = getIdFromTag(tag)))
}

async function tagTextSearch(pagination, text) {
  var tagquery = TagModel.find({tag: {$regex: text, $options: 'i'}})

  if (pagination.page && pagination.size) tagquery.skip((pagination.page - 1) * pagination.size)

  if (pagination.size) tagquery.limit(pagination.size)

  return tagquery.exec()
}

async function tagTextCount(text) {
  return TagModel.countDocuments({tag: {$regex: text, $options: 'i'}}).exec()
}

async function create(tag, implies) {
  return TagModel.create({tag: tag, implies: implies})
}

module.exports.parseTags = parseTags
module.exports.getIdFromTag = getIdFromTag
module.exports.getIdFromTags = getIdFromTags
module.exports.tagTextSearch = tagTextSearch
module.exports.tagTextCount = tagTextCount
module.exports.create = create
