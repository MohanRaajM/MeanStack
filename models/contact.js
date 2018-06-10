var mongoose = require('mongoose')

var {contact_schema} = require('../schema/contact_schema')

module.exports.Contact = mongoose.model('Contact', contact_schema)
