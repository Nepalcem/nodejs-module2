const { authorizeSchema } = require("../models/userModel");

exports.validateUser = async (req, res, next) => {
    const request = req.body;
    const { error, value } = authorizeSchema.validate(request);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      req.body = value;
      next();
    }
  };