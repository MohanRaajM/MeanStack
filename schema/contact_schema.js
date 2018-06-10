var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema

var contact_schema = new Schema({
  name: {
    type: String,
    validate: {
      validator: function (v) {
        return v.trim().length > 0
      },
      message: 'Please provide valid name.'
    },
    required: [true, 'Name is required.']
  },
  email: String,
  number: String
})

contact_schema.statics.getAll = function (query = {}) {
  const db_query = this.find(query, { __v: 0 }).sort({ name: 1 })
  return db_query.lean().exec()
}

contact_schema.statics.getById = function (query = {}) {
  return this.find(query, { __v: 0 })
              .sort({ name: 1 })
              .lean()
              .exec()
}

module.exports.contact_schema = contact_schema
