const express = require('express');
const validateBody = require('../../middleWares/validateBody');
const { validateUser } = require('../../middleWares/authorizeMiddlewares');

const router = express.Router();

router.post("/", validateBody, validateUser);
// router.post('/users/login');

module.exports = router;