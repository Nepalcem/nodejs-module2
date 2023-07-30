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
    console.log('123');
  }
};

const removeContact = async (contactId) => {
  const contactsArray = await listContacts();
  const element = contactsArray.find((el) => el.id === contactId);

  if (!element) {
    return null;
  }
  const indexOfElement = contactsArray.indexOf(element);
  const deletedElement = contactsArray.splice(indexOfElement, 1);

  // await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return deletedElement;
};

const addContact = async (body) => {
  try {
    const existingContact = await Contact.findOne({ email: body.email });
    if (existingContact) {
      return existingContact.email
    }
    return await Contact.create(body);
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsArray = await listContacts();
    const element = contactsArray.find((el) => el.id === contactId);

    console.log(element || null);
    if (!element) {
      return null;
    }

    const indexOfElement = contactsArray.indexOf(element);
    const updatedElement = {
      ...element,
      ...body,
    };
    console.log(updatedElement);
    const updatedContactsArray = [...contactsArray];
    updatedContactsArray[indexOfElement] = updatedElement;
    // await fs.writeFile(
    //   contactsPath,
    //   JSON.stringify(updatedContactsArray, null, 2)
    // );

    return updatedElement;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
