const budget = require("./routes/BudgetController");
const expenses = require("./routes/ExpensesController");
const user = require("./routes/UserController");

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import https from "https";
import passport from "passport";
import process from "process";

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

dotenv.config();

// Declaring global variables
global.__basedir = __dirname;
global.whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

//https certification options
// const httpsOptions = {
//   key: fs.readFileSync(process.env.SSL_CERT_KEY),
//   cert: fs.readFileSync(process.env.SSL_CERT_FILE),
// };

// Middleware
app.use(express.json());
app.use(compression());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// Serving static images, which can be accessed through url
app.use("/resources/expense_image", express.static(process.cwd() + "/uploads/expenses"));
app.use("/resources/avatar_image", express.static(process.cwd() + "/uploads/avatars"));
app.use(require("serve-static")(__dirname + "/public"));
app.use(express.static("/public"));
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Limit file upload to 4MB
app.use(fileUpload({ limits: { fileSize: 4 * 1024 * 1024 } }));
if (!fs.existsSync(`./uploads/expenses`)) {
  fs.mkdirSync(`./uploads/expenses`, { recursive: true });
}

if (!fs.existsSync(`./uploads/avatar`)) {
  fs.mkdirSync(`./uploads/avatar`, { recursive: true });
}

// Using Passportjs for authentification
require("./middleware/authorize");
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});
app.use(cookieParser());

// Using cloud mongoDB
try {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.rgrkl.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`
  );
} catch (error) {
  console.log(error);
}

app.use("/api", user);
app.use("/api/expenses", expenses);
app.use("/api/budget", budget);

app.all("*", (req, res) => res.status(404).json({ msg: "Page not Found" }));

// const httpsPort = process.env.HTTPS_PORT || 5050;
// if (process.env.HTTPS_PORT) {
//   console.log("Server is running on port: " + httpsPort);
//   https.createServer(httpsOptions, app).listen(httpsPort);
// }

const port = process.env.PORT || 3030;
app.listen(port, (): void => {
  console.log("Server is running on port: ", port);
});
