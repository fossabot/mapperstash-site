const TagModel = require('../models/tags.js')

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

  return await tagquery.exec()
}

async function tagTextCount(text) {
  return await TagModel.countDocuments({tag: {$regex: text, $options: 'i'}}).exec()
}

module.exports.getIdFromTag = getIdFromTag
module.exports.tagTextSearch = tagTextSearch
module.exports.tagTextCount = tagTextCount
