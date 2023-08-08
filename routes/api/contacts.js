const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
  // updateStatusContact,
} = require("../../controllers/userController");

const {
  validateContact,
  validateFavorite,
  validateContactId,
} = require("../../middleWares/validateContact");

router.get("/", getContacts);
router.get("/:contactId", validateContactId, getContactById);
router.post("/", validateContact, createContact);
router.delete("/:contactId", validateContactId, deleteContact);
router.put("/:contactId", validateContactId, validateContact, patchContact);
router.patch(
  "/:contactId/favorite",
  validateContactId,
  validateFavorite,
  patchContact
);

module.exports = router;
