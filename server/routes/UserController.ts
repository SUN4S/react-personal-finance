import { UserModel, joiUserSchema } from "../models/userSchema";
import express, { Request, Response } from "express";

import { BudgetModel } from "../models/budgetSchema";
import { ExpensesModel } from "../models/expensesSchema";
import bcrypt from "bcrypt";
import logger from "../config/winston";
import passport from "passport";

const router = express.Router();

// bcrypt variable
const saltRounds = 10;

// Login uses passport.js to authenticate user
// "Local" strategy only uses Username and Passwowrd for authentication
router.post("/login", passport.authenticate("local"), async (req: Request, res: Response) => {
  res.json({ msg: "Logged in successfully", username: req.user.username, image: req.user.image });
});

// Get request to check if user is logged in
router.get("/loggedIn", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res
      .status(200)
      .json({ msg: "User is logged in", username: req.user.username, image: req.user.image });
  } else {
    res.status(401).json({ msg: "Unauthorizes access" });
  }
});

// Set user avatar image
router.post("/avatar", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    // Defining default values
    let file = undefined;
    let fileName = null;
    // Checking if file was provided
    if (req.files) {
      const file = req.files.avatar;
      const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + file.name;
      if (!global.whitelist.includes(file.mimetype)) {
        return res.json({ msg: "Bad file format" });
      } else {
        file.mv(`${global.__basedir}/uploads/avatars/${fileName}`);
      }

      // Saving file name in userModel which will be used later to find the img
      const changeAvatar = await UserModel.findOneAndUpdate(
        { _id: req.user.id },
        { image: fileName }
      );
      return res.json({ msg: "Successfuly Added Avatar" });
    } else {
      res.json({ msg: "Avatar not provided" });
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
});

// Register a new user
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (user != null) {
      if (user.username === username) {
        logger.warn(`Duplicate User Attempted Registration (Username: ${username})`);
      }
      if (user.email === email) {
        logger.warn(`Duplicate User Attempted Registration (Email: ${email})`);
      }
      return res.status(409).json({ msg: "Username or Email already in use" });
    } else {
      const data = joiUserSchema.validate({
        username: username,
        email: email,
        password: password,
      });

      if (data.error) {
        return res.status(400).json({ msg: data.error.message });
      }

      //Bcrypt works its magic
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          // Create a user, as well as extra collections linking them together
          // by user _id which is named userid in other collections
          UserModel.create({
            username: username,
            email: email,
            hash: hash,
          }).then((response) => {
            ExpensesModel.create({
              userid: response._id,
              expenses: [],
            });
            BudgetModel.create({
              userid: response._id,
              budget: [],
            });
          });
        });
      });
      logger.info(`Created new Account`);
      return res.status(201).json({ msg: "Account created succesfully" });
    }
  } catch (error) {
    logger.error(error);
  }
});

router.post("/logout", (req: Request, res: Response) => {
  logger.info(`${req.user.username} Logged Out`);
  req.logout();
  res.json({ msg: "Logged out successfully" });
});

module.exports = router;
