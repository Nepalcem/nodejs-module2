const express = require("express");
const validateBody = require("../../middleWares/validateBody");
const {
  checkIfUserExist,
  validateUserFields,
  validateEmailBody,
} = require("../../middleWares/authorizeMiddlewares");
const {
  registrationController,
  authorizationController,
  getCurrentUser,
  logoutUser,
  updateSubscription,
  updateAvatar,
  verifyMailToken,
  secondaryEmailVerification,
} = require("../../controllers/authorizeController");
const { validateToken } = require("../../middleWares/validateToken");
const upload = require("../../middleWares/upload");

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
router.post("/logout", validateToken, logoutUser);
router.get("/current", validateToken, getCurrentUser);
router.patch("/", validateToken, validateBody, updateSubscription);
router.patch("/avatars", validateToken, upload.single("avatar"), updateAvatar);
router.post("/verify", validateEmailBody, secondaryEmailVerification );
router.get("/verify/:verificationToken", verifyMailToken);

module.exports = router;
