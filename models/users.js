var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true}
})

UserSchema.path('name').validate(async checkedName => {
  const legalName = new RegExp('^[A-Za-z0-9\-]+$')
  if (!legalName.test(checkedName)) return false

  const duplicateName = await UserSchema.countDocuments({url: {$regex: `^${checkedName}$`, $options: 'i'}})
  if (duplicateName) return false

  return true
})

UserSchema.path('password').validate(async checkedPassword => {
  if (checkedPassword.length > 64) return false
  if (checkedPassword.length < 8) return false

  return true
})

UserSchema.pre('save', next => {
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt(16)
  this.password = await bcrypt.hash(this.password, salt)

  return next()
})

module.exports = mongoose.model('User', UserSchema)
