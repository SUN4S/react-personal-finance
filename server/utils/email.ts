import logger from "../config/winston";
import nodemailer from "nodemailer";

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// check if transporter connected successfully
transporter
  .verify()
  .then(console.log("Connected Email transporter"))
  .catch((error) => logger.error(error.message));
