import { Request, Response } from "express";

import { BudgetModel } from "../models/budgetSchema";
import { ExpensesModel } from "../models/expenseSchema";
import { ReportsModel } from "../models/reportsSchema";
import { StockModel } from "../models/stockSchema";
import { UserModel } from "../models/userSchema";
import bcrypt from "bcrypt";
import { generateDeletionEmail } from "../utils/emailTemplates/deletionTemplate";
import { generatePassword } from "../utils/passwordGenerator";
import { generatePasswordChangeEmail } from "../utils/emailTemplates/changePasswordTemplate";
import { generatePasswordRecoveryEmail } from "../utils/emailTemplates/recoverPasswordTemplate";
import { generateRegistrationEmail } from "../utils/emailTemplates/registrationTemplate";
import { joiUserSchema } from "../models/userSchema";
import logger from "../config/winston";

// bcrypt variable
const saltRounds = 10;

// funtion to log in user
/*
  body: {
    username: string,
    password: string
  }
*/
export const login = (req: Request, res: Response) => {
  return res.json({
    msg: "Logged in successfully",
    username: req.user.username,
    image: req.user.image,
  });
};

// function to check if user is logged in
// this function does not take a body
// uses PassportJS session to authenticate user
export const loggedIn = async (req: Request, res: Response) => {
  // passportJS function to check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorizes access" });
  }
  // try-catch just in case something goes horribly wrong
  try {
    return res
      .status(200)
      .json({ msg: "User is logged in", username: req.user.username, image: req.user.image });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// function to add new avatar image
/*
  body: {
    avatar: File
  }
*/
export const addAvatar = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  try {
    // Defining default values
    let file = undefined;
    let fileName = null;
    // Checking if file was provided
    if (req.files) {
      // get file named avatar from fileList
      const file = req.files.avatar;
      // generate a new filename that will be used to store on server
      // generating new names prevents duplicate images being added
      const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + file.name;
      if (!global.whitelist.includes(file.mimetype)) {
        logger.warn(`${req.user.username} Provided Bad File Format`);
        return res.json({ msg: "Bad file format" });
      } else {
        logger.info("Saved New Image To Server");
        // express fileupload function to save file to folder
        file.mv(`./uploads/avatars/${fileName}`);
      }

      // Saving file name in userModel which will be used later to find the img
      const changeAvatar = await UserModel.findOneAndUpdate(
        { _id: req.user.id },
        { image: fileName }
      );
      return res.status(200).json({ msg: "Successfuly Added Avatar" });
    } else {
      return res.status(400).json({ msg: "Avatar not provided" });
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

// function to register a new user
/*
  body: {
    username: string,
    password: string,
    email: string
  }
*/
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // use Joi to validate provided inputs
  const data = joiUserSchema.validate({
    username: username,
    email: email,
    password: password,
  });

  // If joi validation didn't pass, return
  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
    // Try to get user with provided email/username
    const user = await UserModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    // If user already exists, return error
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
          await StockModel.create({
            userid: response._id,
            heldStock: [],
          });
          generateRegistrationEmail(response.email, response.username);
          logger.info(`Created new Account`);

          // Function to login user immediately after registration
          req.login(
            { username: response.username, password: response.hash, id: response._id },
            { session: true },
            (error) => {
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

// TODO: Generate email to notify of password change
// function to change current user password
/*
  body: {
    oldPassword: string,
    newPassword: string
  }
*/
export const changePassword = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  // Get new and old passwords from body
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  // Extract schema and validate new password
  const passwordSchema = joiUserSchema.extract("password").validate(newPassword);
  // If new/old passwords match - return
  if (oldPassword === newPassword) {
    return res.json({ msg: "New Password same as Current Password" });
  } else if (passwordSchema.error) {
    return res.status(400).json({ msg: passwordSchema.error.message });
  } else {
    // Get current user data
    const response = await UserModel.findById(req.user.id);
    bcrypt.compare(oldPassword, response.hash, (err, success) => {
      // Check if current password matches one on the DB
      if (!success) {
        return res.status(400).json({ msg: "Current Password did not match" });
      } else {
        // Generate new password and update user
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(newPassword, salt, async (err, hash) => {
            const user = await UserModel.findOneAndUpdate(
              { _id: req.user.id },
              { $set: { hash: hash } }
            );
          });
        });
        logger.info(`${response.username} updated password`);
        generatePasswordChangeEmail(response.email, response.username);
        return res.status(201).json({ msg: "Password Changed Successfully" });
      }
    });
  }
};

// function to recover passowrd
/*
  body: {
    email: string,
  }
*/
export const recoverPassword = async (req: Request, res: Response) => {
  try {
    // mongoose query try to find user with provided email
    const response = await UserModel.findOne({ email: req.body.email });
    // generate a temporary password
    const tempPassword = generatePassword(16);
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(tempPassword, salt, async (err, hash) => {
        // push temporary password to database
        await UserModel.findOneAndUpdate({ email: response.email }, { $set: { hash: hash } });
      });
    });
    generatePasswordRecoveryEmail(response.email, response.username, tempPassword);
    logger.info(`${response.username} requested recovery password`);
    return res.status(201).json({ msg: "Recovery Email Sent" });
  } catch (error) {
    logger.error(error.message);
    return res.status(201).json({ msg: "Recovery Email Sent" });
  }
};

// Fcuntion used to delete current user
// uses PassportJS session to authenticate user that needs to be deleted
export const deleteUser = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  // Remove current user from DB
  // Along with all other collections connected to the user
  try {
    const response = await UserModel.findOneAndDelete({
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
    await StockModel.findOneAndDelete({
      userid: req.user.id,
    });
    // Call function to generate and send email to user
    generateDeletionEmail(response.email, response.username);
    logger.info(`${req.user.username} has been deleted`);
    // Passport function to remove user from session
    req.logout();
    return res.json({ msg: "User Successfully Deleted" });
  } catch (error) {
    logger.error(error.message);
  }
};

// function to log out user
// uses PassportJS session to authenticate user that needs to be logged out
export const logout = (req: Request, res: Response) => {
  logger.info(`${req.user.username} Logged Out`);
  req.logout();
  res.json({ msg: "Logged out successfully" });
};
