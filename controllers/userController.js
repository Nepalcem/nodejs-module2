const contacts = require("../models/contactFunctions");

exports.getContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

exports.getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

exports.createContact = async (req, res, next) => {
  const request = req.body;

  try {
    const result = await contacts.addContact(request);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "Contact deleted." });
};

exports.patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  const request = req.body;

  try {
    const result = await contacts.updateContact(contactId, request);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
