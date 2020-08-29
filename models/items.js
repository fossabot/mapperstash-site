var mongoose = require('mongoose')
var uniquevalidator = require('mongoose-unique-validator')

var ItemSchema = new mongoose.Schema({
  url: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
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

  return true
})

ItemSchema.plugin(uniquevalidator)

module.exports = mongoose.model('Item', ItemSchema)
