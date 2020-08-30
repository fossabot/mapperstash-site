var mongoose = require('mongoose')
var uniquevalidator = require('mongoose-unique-validator')
var bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
  password: {type: String, required: true}
})

UserSchema.path('name').validate(async checkedName => {
  const legalName = new RegExp('^[A-Za-z0-9\-]+$')
  if (!legalName.test(checkedName)) return false

  return true
})

UserSchema.plugin(uniquevalidator)

UserSchema.path('password').validate(async checkedPassword => {
  if (checkedPassword.length > 64) return false
  if (checkedPassword.length < 8) return false

  return true
})

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)

  return next()
})

UserSchema.methods.comparePassword = async function(checkedPassword) {
  return bcrypt.compare(checkedPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
