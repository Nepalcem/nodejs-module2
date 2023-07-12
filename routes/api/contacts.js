const express = require("express");
const contacts = require("../../models/contactFunctions");
const router = express.Router();
const {schema,putSchema} = require("../../utils/schemaValidation");


router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

router.post("/", async (req, res, next) => {
  const request = req.body;
  const { error, value } = schema.validate(request);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    try {
      const result = await contacts.addContact(value);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const request = req.body;
  const { error, value } = putSchema.validate(request);
  if (error) {
    res.status(400).json({"message": "missing fields"});
  } 
  try {
    const result = await contacts.updateContact(contactId, value);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
