const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const Jimp = require("jimp");
const dotenv = require("dotenv");

const signToken = require("../utils/signToken");
const { User } = require("../models/userModel");
const tryCatchHandler = require("../utils/tryCatchHandler");
const sendEmail = require("../utils/sendGridService");

dotenv.config({ path: path.join(__dirname, "..", "environment", ".env") });
const { BASE_URL } = process.env;

exports.registrationController = tryCatchHandler(async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationCode = nanoid();
  const newUser = {
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken: verificationCode,
  };

  const createdUser = await User.create(newUser);
  const verifyEmail = {
    to: email,
    subject: "Verify Email Address",
    html: `<p>Verify email address by using the following link 
    - <a target="_blank" href="${BASE_URL}/users/verify/${verificationCode}">CLick Me!</a></p>`,
  };

  await sendEmail(verifyEmail);

  return res.status(201).json({
    user: {
      email: createdUser.email,
      subscription: createdUser.subscription,
    },
  });
});

exports.authorizationController = tryCatchHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  if (!user.verified) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = signToken(user.id);
  await User.findByIdAndUpdate(user._id, { token });

  return res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

exports.getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

exports.logoutUser = tryCatchHandler(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "Logout successful" });
});

exports.updateSubscription = tryCatchHandler(async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription });
  return res.status(200).json({ message: "Subscription updated successfully" });
});

exports.updateAvatar = tryCatchHandler(async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const avatarDir = path.join(__dirname, "../", "public", "avatars");
  const filename = `${_id}_${originalname}`;

  await Jimp.read(tempUpload).then((image) => {
    return image
      .resize(250, 250)
      .quality(80)
      .write(path.join(avatarDir, filename));
  });
  await fs.unlink(tempUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
});

exports.verifyMailToken = tryCatchHandler(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { _id } = user;
  await User.findByIdAndUpdate(_id, {
    verified: true,
    verificationToken: null,
  });

  return res.status(200).json({ message: "Verification successful" });
});
