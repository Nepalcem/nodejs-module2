const { schema, favoriteSchema } = require("../utils/schemaValidation");

exports.validateContact = async (req, res, next) => {
  const request = req.body;
  if (Object.keys(request).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { error, value } = schema.validate(request);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    req.body = value;
    next();
  }
};

exports.validateFavorite = async (req, res, next) => {
  const request = req.body;
  if (Object.keys(request).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { error, value } = favoriteSchema.validate(request);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    req.body = value;
    next();
  }
};
