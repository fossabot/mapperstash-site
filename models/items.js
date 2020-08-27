var mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
  url: {type: String, required: true},
  name: String,
  tags: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  }]
})

ItemSchema.path('url').validate(async checkedUrl => {
  var urlObj
  try {
    urlObj = new URL(checkedUrl)
  } catch (e) {
    return false
  }

  const duplicateUrl = await ItemSchema.countDocuments({url: {$regex: `^${checkedUrl}$`, $options: 'i'}})
  if (duplicateUrl) return false

  return true
})

module.exports = mongoose.model('Item', ItemSchema)
