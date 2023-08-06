const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
  updateStatusContact,
} = require("../../controllers/userController");

const { validateContact, validateFavorite } = require("../../middleWares/validateContact");

router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", validateContact, createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", validateContact, patchContact);
router.patch("/:contactId/favorite", validateFavorite, updateStatusContact);

module.exports = router;
