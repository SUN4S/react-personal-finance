import {
  addAvatar,
  changePassword,
  deleteUser,
  loggedIn,
  login,
  logout,
  recoverPassword,
  register,
} from "../controllers/UserControllers";

import express from "express";
import passport from "passport";

const router = express.Router();

// Login uses passport.js to authenticate user
// "Local" strategy only uses Username and Passwowrd for authentication
router.post("/login", passport.authenticate("local"), login);

// Get request to check if user is logged in
router.get("/loggedIn", loggedIn);

// Set user avatar image
router.post("/avatar", addAvatar);

// Register a new user
router.post("/register", register);

// Change User Password
router.put("/changePassword", changePassword);

// Change User Password
router.post("/recoverPassword", recoverPassword);

// Delete session user
router.delete("/delete", deleteUser);

// Logout user from session
router.post("/logout", logout);

module.exports = router;
