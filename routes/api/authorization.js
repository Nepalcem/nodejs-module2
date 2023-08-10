const express = require("express");
const validateBody = require("../../middleWares/validateBody");
const {
  checkIfUserExist,
  validateUserFields,
} = require("../../middleWares/authorizeMiddlewares");
const {
  registrationController,
  authorizationController,
  getCurrentUser,
} = require("../../controllers/authorizeController");
const { validateToken } = require("../../middleWares/validateToken");

const router = express.Router();

router.post(
  "/register",
  validateBody,
  validateUserFields,
  checkIfUserExist,
  registrationController
);
router.post(
  "/login",
  validateBody,
  validateUserFields,
  authorizationController
);
router.post("/logout", validateToken);
router.get("/current", validateToken, getCurrentUser);

module.exports = router;
