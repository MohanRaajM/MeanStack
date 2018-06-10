var { Contact } = require('../models/contact')

exports.getContactsById = function (req, res) {
  const query = {'_id': req.params.id}
  console.log('Get By Id', query);

  Contact.findOne(query)
    .then(function (response) {
      res.send( response )
    }).catch(function (err) {
      res.send(err)
    })
}

exports.getAllContactList = function (req, res) {
  console.log('Get All');
  Contact.getAll({})
    .then(function (response) {
      res.send( response )
    }).catch(function (err) {
      res.send(err)
    })
}

exports.addNewContactList = function (req, res) {
  const contactObj = new Contact(req.body);
  console.log('Add!!', JSON.stringify(req.body));
  contactObj.save(function(err){
    if (err) {
      res.send({ error: true, message: err })
    } else {
      res.send({message: 'Contact has been successfully created'})
    }
  })
}

exports.deleteContactsById = function (req, res) {
  var id = req.params.id;
  console.log('Delete', id);
  Contact.remove({ _id: id }, function(err) {
    if (err) {
      res.send({ error: true, message: err })
    } else {
      res.send({message: 'Contact has been successfully deleted'})
    }
  });
}

exports.updateContactsById = function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  const contactObj = req.body
  console.log('Update', id);
  Contact.findOneAndUpdate({ _id: id }, contactObj, {runValidators: true, context: 'query', new: true}, function(updateErr, contact){
    if (updateErr) {
      res.send({ error: true, message: err })
    } else {
      res.send({message: 'Contact has been successfully updated!!'})
    }
  })
}
