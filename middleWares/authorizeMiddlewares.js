const {
  authorizeSchema,
  User,
  emailVerificationSchema,
} = require("../models/userModel");

exports.validateUserFields = async (req, res, next) => {
  const request = req.body;
  const { error, value } = authorizeSchema.validate(request);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    req.body = value;
    next();
  }
};

exports.checkIfUserExist = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json({ message: "Email in use" });
  } else {
    next();
  }
};

exports.validateEmailBody = async (req, res, next) => {
  const request = req.body;
  const { error, value } = emailVerificationSchema.validate(request);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value;
  next();
};
