var mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
  url: String,
  name: String,
  tags: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  }]
})

module.exports = mongoose.model('Item', ItemSchema)
