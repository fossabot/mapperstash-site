var mongoose = require('mongoose')

var TagSchema = new mongoose.Schema({
  tag: String,
  implied: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  }]
})

module.exports = mongoose.model('Tag', TagSchema)
