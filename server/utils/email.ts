import logger from "../config/winston";
import nodemailer from "nodemailer";

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  secure: true, // use SSL,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
// check if transporter connected successfully
transporter
  .verify()
  .then(console.log("Connected Email transporter"))
  .catch((error) => logger.error(error.message));
