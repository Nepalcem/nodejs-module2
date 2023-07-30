const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contactFunctions");

exports.getContacts = async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
};

exports.getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

exports.createContact = async (req, res, next) => {
  const request = req.body;
  const result = await addContact(request);
  if (req.body.email === result) {
    return res.status(409).json("User with such email already exist");
  }
  res.status(201).json(result);
};

exports.deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "Contact deleted." });
};

exports.patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  const request = req.body;

  const result = await updateContact(contactId, request);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};
