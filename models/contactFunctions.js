const fs = require("fs/promises");
const path = require("path");
const { putSchema } = require("../utils/schemaValidation");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const readResult = await fs.readFile(contactsPath);
    console.table(JSON.parse(readResult));
    return JSON.parse(readResult);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsArray = await listContacts();
    const element = contactsArray.find((el) => el.id === contactId);
    console.log(element || null);
    return element || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  const contactsArray = await listContacts();
  const element = contactsArray.find((el) => el.id === contactId);

  console.log(element || null);
  if (!element) {
    return null;
  }
  const indexOfElement = contactsArray.indexOf(element);
  const deletedElement = contactsArray.splice(indexOfElement, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return deletedElement;
};

const addContact = async (body) => {
  const contactsArray = await listContacts();
  const { nanoid } = await import("nanoid");
  const newContact = {
    id: nanoid(),
    ...body,
  };
  const newContactsArray = [...contactsArray, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactsArray, null, 2));
  console.log(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  try {
    const contactsArray = await listContacts();
    const element = contactsArray.find((el) => el.id === contactId);

    console.log(element || null);
    if (!element) {
      return null;
    }

    const { error, value } = putSchema.validate(body);
    if (error) {
      throw new Error("Request body contains unappropriate fields");
    }

    const indexOfElement = contactsArray.indexOf(element);
    const updatedElement = {
      ...element,
      ...value,
    };
    console.log(updatedElement);
    const updatedContactsArray = [...contactsArray];
    updatedContactsArray[indexOfElement] = updatedElement;
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContactsArray, null, 2)
    );

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

// updateContact('C9sjBfCo4UJCWjzBnOtxl',{"name": "Simon Kilgour"});
