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

async function getIdFromTag(tags) {
  tags = await Promise.all(tags.map(async tag => {
    return TagModel.findOne({ tag: tag }).exec()
  }))
  tags = tags.map(tag => {return tag.id})
  return tags
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

module.exports.parseTags = parseTags
module.exports.getIdFromTag = getIdFromTag
module.exports.tagTextSearch = tagTextSearch
module.exports.tagTextCount = tagTextCount
