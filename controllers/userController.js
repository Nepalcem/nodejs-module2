const Contact = require("../models/contactModel");

exports.getContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

exports.getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findOne({ _id: contactId });
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

exports.createContact = async (req, res, next) => {
  const request = req.body;
  try {
    const existingContact = await Contact.findOne({ email: request.email });
    if (existingContact) {
      return res
        .status(409)
        .json({ message: "User with such email already exists" });
    }

    const result = await Contact.create(request);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error.message);
  }
};

exports.deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndRemove({ _id: contactId });
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json({ message: "Contact deleted." });
  } catch (error) {
    console.log(error.message);
  }
};

exports.patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  const request = req.body;
  try {
    const options = { new: true };
    const result = await Contact.findByIdAndUpdate(contactId, request, options);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

// exports.updateStatusContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const request = req.body;
//   try {
//     const options = { new: true };
//     const result = await Contact.findByIdAndUpdate(contactId, request, options);
//     if (!result) {
//       return res.status(404).json({ message: "Not found" });
//     }
//     return res.json(result);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
