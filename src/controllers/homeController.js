const Contacts = require('../models/ContactModel');

exports.index = async (req, res) => {
  const contacts = await Contacts.findContacts();
  res.render('index', {contacts});

};


