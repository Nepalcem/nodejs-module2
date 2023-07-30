const Contact = require("../models/contactModel");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findOne({ _id: contactId });
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const existingContact = await Contact.findOne({ email: body.email });
    if (existingContact) {
      return existingContact.email;
    }
    return await Contact.create(body);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndRemove({ _id: contactId });
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const options = { new: true };
    return await Contact.findByIdAndUpdate(contactId, body, options);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
