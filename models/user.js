var mongoose = require('mongoose')

var user_schema = require('../schema/user_schema').user_schema

module.exports.User = mongoose.model('User', user_schema)
