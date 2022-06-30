import express, { Request, Response } from "express";

import { BudgetModel } from "../models/budgetSchema";
import { ExpensesModel } from "../models/expenseSchema";
import { ReportsModel } from "../models/reportsSchema";
import { UserModel } from "../models/userSchema";
import bcrypt from "bcrypt";
import { generateRegistrationEmail } from "../utils/emailTemplates/registrationTemplate";
import { joiUserSchema } from "../models/userSchema";
import logger from "../config/winston";
import passport from "passport";

// bcrypt variable
const saltRounds = 10;

export const login = (req: Request, res: Response) => {
  return res.json({
    msg: "Logged in successfully",
    username: req.user.username,
    image: req.user.image,
  });
};

export const loggedIn = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      return res
        .status(200)
        .json({ msg: "User is logged in", username: req.user.username, image: req.user.image });
    } catch (error) {
      logger.error(error.message);
    }
  } else {
    res.status(401).json({ msg: "Unauthorizes access" });
  }
};

export const addAvatar = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
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
        return res.json({ msg: "Avatar not provided" });
      }
    } catch (error) {
      logger.error(error.message);
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const data = joiUserSchema.validate({
    username: username,
    email: email,
    password: password,
  });

  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
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
      //Bcrypt works its magic
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          // Create a user, as well as extra collections linking them together
          // by user _id which is named userid in other collections
          const response = await UserModel.create({
            username: username,
            email: email,
            hash: hash,
          });
          await ExpensesModel.create({
            userid: response._id,
            expenses: [],
          });
          await BudgetModel.create({
            userid: response._id,
            budget: [],
          });
          await ReportsModel.create({
            userid: response._id,
            weeklyReports: [],
            monthlyReports: [],
          });

          generateRegistrationEmail(response.email, response.username);
          logger.info(`Created new Account`);

          // Function to login user immediately after registration
          req.login(
            { username: response.username, password: response.password, id: response._id },
            { session: true },
            (error) => {
              console.log(error);
              if (error) {
                return logger.error(error.message);
              } else {
                return res.status(201).json({ msg: "Account created succesfully" });
              }
            }
          );
          //return res.status(201).json({ msg: "Account created succesfully" });
        });
      });
    }
  } catch (error) {
    logger.error(error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      await UserModel.findOneAndDelete({
        _id: req.user.id,
      });
      await ExpensesModel.findOneAndDelete({
        userid: req.user.id,
      });
      await BudgetModel.findOneAndDelete({
        userid: req.user.id,
      });
      await ReportsModel.findOneAndDelete({
        userid: req.user.id,
      });

      logger.info(`${req.user.username} has been deleted`);
      req.logout();
      return res.json({ msg: "User Successfully Deleted" });
    } catch (error) {
      logger.error(error.message);
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};

export const logout = (req: Request, res: Response) => {
  logger.info(`${req.user.username} Logged Out`);
  req.logout();
  res.json({ msg: "Logged out successfully" });
};
