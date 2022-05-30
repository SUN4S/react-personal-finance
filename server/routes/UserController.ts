import express, { Request, Response } from "express";

import { BudgetModel } from "../models/budgetSchema";
import { ExpensesModel } from "../models/expensesSchema";
import { UserModel } from "../models/userSchema";
import bcrypt from "bcrypt";
import passport from "passport";

const router = express.Router();

// bcrypt variable
const saltRounds = 10;

// Login uses passport.js to authenticate user
// "Local" strategy only uses Username and Passwowrd for authentication
router.post("/login", passport.authenticate("local"), async (req: Request, res: Response) => {
  res.json({ msg: "Logged in successfully" });
});

// Get request to check if user is logged in
router.get("/loggedIn", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ msg: "User is logged in" });
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

router.get("/getUser", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const user = await UserModel.findById(req.user.id);
    return res
      .status(200)
      .json({ username: user.username, image: `http://localhost:3030/avatars/${user.image}` });
  }
  res.status(401).json({ msg: "Unauthorized access" });
});

// Register a new user
router.post("/register", async (req: Request, res: Response) => {
  const body = req.body;
  const password = body.password;

  const doc = await UserModel.findOne({
    $or: [{ username: body.username }, { email: body.email }],
  });

  if (doc != null) {
    return res.status(409).json({ msg: "Username or Email already in use" });
  } else {
    //Bcrypt works its magic
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Create a user, as well as extra collections linking them together
        // by user _id which is named userid in other collections
        UserModel.create({
          username: body.username,
          email: body.email,
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
    return res.status(201).json({ msg: "Account created succesfully" });
  }
  res.status(500).json({ msg: "Internal server error" });
});

router.post("/logout", (req: Request, res: Response) => {
  req.logout();
  res.json({ msg: "Logged out successfully" });
});

module.exports = router;
