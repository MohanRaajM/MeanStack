var { db_connection } = require('../db/connection')
var { Contact } = require('../models/contact')
var async = require('async')

function updateContacts (callback) {
  console.log('info', 'updateContacts()', 'Fetching all contacts.')
  Contact.find({ publish: false }, function (err, docs) {
    if (err) {
      console.log('error', 'updateContacts() ', 'Error while Fetching contacts.', err)
      callback(err, null)
    }
  }).exec().then(function (docs) {
	    async.map(docs, updatePublishFlag, function (err, res) {
	    	if (err) {
          console.log('error', 'updateContacts() -> async.map()', 'Error while updating publish attribute..', err)
          callback(err, null)
        } else {
          console.log('info', 'updateContacts()', 'Successfully updated publish attribute.')
          callback(null, res)
        }
		  })
  })
}

function updatePublishFlag (doc, callback) {
  console.log('info', 'updatePublishFlag()', 'Updating publish and publishedAt attribute')
  const publishedAt = new Date()
  Contact.update(
      { _id: doc._id},
      { $set: { 'publish': true, published_at: publishedAt } }
    ).exec()
  callback()
}

function publishContacts () {
  updateContacts(function (err, res) {
    setTimeout(function () {
      db_connection.close()
    }, 1)
  })
}

publishContacts()
