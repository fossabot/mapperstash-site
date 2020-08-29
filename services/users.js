const UserModel = require('../models/users.js')

async function userTextSearch(pagination, text) {
  var query = UserModel.find({name: {$regex: text, $options: 'i'}})

  if (pagination.page && pagination.size) query.skip((pagination.page - 1) * pagination.size)

  if (pagination.size) query.limit(pagination.size)

  return query.exec()
}

async function userTextCount(text) {
  return UserModel.countDocuments({name: {$regex: text, $options: 'i'}}).exec()
}

async function create(body) {
  return UserModel.create({name: body.name, password: body.password})
}

module.exports.userTextSearch = userTextSearch
module.exports.userTextCount = userTextCount
module.exports.create = create
