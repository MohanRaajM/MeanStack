module.exports = function (app) {
  console.log('Test');
  const {
    getAllContactList,
    getContactsById,
    addNewContactList,
    deleteContactsById,
    updateContactsById
  } = require('./controllers/contactsController')

  app.get('/contactlist', getAllContactList)
  app.get('/contactlist/:id', getContactsById)
  app.post('/contactlist', addNewContactList)
  app.delete('/contactlist/:id', deleteContactsById)
  app.put('/contactlist/:id', updateContactsById)
}

process.on('unhandledRejection', (reason, promise) => {
  console.log('error', 'unhandledRejection()', JSON.stringify(reason))
})
