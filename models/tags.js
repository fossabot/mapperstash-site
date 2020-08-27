var mongoose = require('mongoose')

var TagSchema = new mongoose.Schema({
  tag: {type: String, required: true},
  implied: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  }]
})

TagSchema.path('tag').validate(async checkedTag => {
  const legalTag = new RegExp('^[A-Za-z0-9-]+$')
  if (!legalTag.test(checkedTag)) return false

  const duplicateTag = await TagSchema.countDocuments({url: {$regex: `^${checkedTag}$`, $options: 'i'}})
  if (duplicateTag) return false

  return true
})

module.exports = mongoose.model('Tag', TagSchema)
