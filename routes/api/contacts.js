const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
} = require("../../controllers/userController");

const { validateContact } = require("../../middleWares/validateContact");

router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", validateContact, createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", validateContact, patchContact);

module.exports = router;
