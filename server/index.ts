const budget = require("./routes/BudgetRoutes");
const expenses = require("./routes/ExpenseRoutes");
const user = require("./routes/UserRoutes");
const reports = require("./routes/ReportsRoutes");
const stocks = require("./routes/StockRoutes");

import "./utils/cronjob";
import "./utils/email";

import express, { Express } from "express";
import { morganRequestMiddleware, morganResponseMiddleware } from "./middleware/morgan";

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import fs from "fs";
import https from "https";
import passport from "passport";
import path from "path";
import process from "process";
import winston from "./config/winston";

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const logger = winston;

const app: Express = express();

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
app.use(morganRequestMiddleware);
app.use(morganResponseMiddleware);
app.use(express.json());
app.use(compression());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:6006",
      "https://www.marglipersonalfinance.me",
      "https://marglipersonalfinance.me",
    ],
  })
);

// Serving static images, which can be accessed through url
app.use("/resources/expense_image", express.static(process.cwd() + "/uploads/expenses"));
app.use("/resources/avatar_image", express.static(process.cwd() + "/uploads/avatars"));
// Serving static website files
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

// check if folder for expense images exists, if it does not create one
// express fileupload does not have functionality to create folders on it's own
if (!fs.existsSync(`./uploads/expenses`)) {
  fs.mkdirSync(`./uploads/expenses`, { recursive: true });
}

// check if folder for avatar images exists, if it does not create one
// express fileupload does not have functionality to create folders on it's own
if (!fs.existsSync(`./uploads/avatars`)) {
  fs.mkdirSync(`./uploads/avatars`, { recursive: true });
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
  logger.error(error.message);
}

app.use("/api/user", user);
app.use("/api/expenses", expenses);
app.use("/api/budget", budget);
app.use("/api/reports", reports);
app.use("/api/stocks", stocks);

// route to send serview worker to client, sometimes it is missing, don't know why
app.get("/ServiceWorker.js", (req, res) => {
  res.header("Content-type: application/javascript");
  res.sendFile(path.join(process.cwd(), "/build/public/ServiceWorker.js"));
});

// send html to base path, reloading on certain pages would throw 404
app.get("/*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/build/public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// route to throw error 404 if route is not defined
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
