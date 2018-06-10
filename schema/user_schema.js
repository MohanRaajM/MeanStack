var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

// define the schema for our user model
var user_schema = mongoose.Schema({
  local: {
    email: { type: String, index: { unique: true } },
    password: String,
    role: String
  }
})

// methods ======================
// generating a hash
user_schema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
user_schema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

user_schema.statics.create_user = function (email, password, role, callback) {
  var User = mongoose.model('User', user_schema)
  var new_user = new User()
  new_user.local.email = email
  new_user.local.password = new_user.generateHash(password)
  new_user.local.role = role || 'admin'
  new_user.save(function (err) {
    console.log('info', MODULE_NAME + ' | ' + FILE_NAME + ' | ' + 'create_user' + ' | ' + 'User `' + new_user.local.email + '` created with role ' + new_user.local.role)
    callback(err, new_user)
  })
}
// create the model for users and expose it to our app
module.exports.user_schema = user_schema
