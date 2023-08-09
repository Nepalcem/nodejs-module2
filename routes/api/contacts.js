const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
} = require("../../controllers/contactController");

const {
  validateContact,
  validateFavorite,
  validateContactId,
} = require("../../middleWares/validateContact");
const validateBody = require("../../middleWares/validateBody");

router.get("/", getContacts);
router.get("/:contactId", validateContactId, getContactById);
router.post("/", validateBody, validateContact, createContact);
router.delete("/:contactId", validateContactId, deleteContact);
router.put(
  "/:contactId",
  validateContactId,
  validateBody,
  validateContact,
  patchContact
);
router.patch(
  "/:contactId/favorite",
  validateContactId,
  validateFavorite,
  patchContact
);

module.exports = router;
