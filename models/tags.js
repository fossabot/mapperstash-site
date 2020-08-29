var mongoose = require('mongoose')
var uniquevalidator = require('mongoose-unique-validator')

var TagSchema = new mongoose.Schema({
  tag: {type: String, required: true, unique: true, uniqueCaseInsensitive:true},
  implied: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  }]
})

TagSchema.path('tag').validate(async checkedTag => {
  const legalTag = new RegExp('^[A-Za-z0-9-]+$')
  if (!legalTag.test(checkedTag)) return false

  return true
})

TagSchema.plugin(uniquevalidator)

module.exports = mongoose.model('Tag', TagSchema)
