const sGmail = require("@sendgrid/mail");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "environment", ".env") });

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sGmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async(data) => {
    const email = {...data, from: EMAIL_FROM};
    await sGmail.send(email);
    return true
}

module.exports = sendEmail;
