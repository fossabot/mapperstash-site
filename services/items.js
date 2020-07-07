const ItemModel = require('../models/items.js')

module.exports.addBro = _ => {
  const bro = new ItemModel({name:'bro'})
  bro.save()
}

module.exports.estimatedCount = async _ => await ItemModel.estimatedDocumentCount()
