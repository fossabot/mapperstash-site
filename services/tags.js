const TagModel = require('../models/tags.js')

async function getIdFromTag(tags) {
  tags = await Promise.all(tags.map(async tag => {
    return TagModel.findOne({ tag: tag }).exec()
  }))
  tags = tags.map(tag => {return tag.id})
  return tags
}

module.exports.getIdFromTag = getIdFromTag