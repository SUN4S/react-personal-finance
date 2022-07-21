import { ExpensesModel, joiExpenseSchema } from "../models/expenseSchema";
import { Request, Response } from "express";

import { DateTime } from "luxon";
import fs from "fs";
import logger from "../config/winston";

// function to get all expenses Array
// uses PassportJS session to authenticate user
export const getAllExpenses = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  try {
    // Gets expense object by userid
    const expenses = await ExpensesModel.findOne({ userid: req.user.id });
    const data = await expenses;
    // sort data by date
    const sortedArray = expenses.expenseList.sort((a, b) => {
      if (b.date > a.date) return 1;
      if (b.date < a.date) return -1;
      return 0;
    });
    logger.info(`${req.user.username} Requested Expense Data`);
    // send sorted by date expense data
    return res.status(200).send(sortedArray);
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// function to get current month expenses
// uses PassportJS session to authenticate user
export const getCurrentMonthExpenses = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ msg: "Unauthorized access" });
  }
  try {
    // Gets expense object
    const expenses = await ExpensesModel.findOne({ userid: req.user.id });
    // Gets current month and year using luxon
    const currentMonth = DateTime.now().month;
    const currentYear = DateTime.now().year;
    // Filters and sorts array here instead of in the client
    const processedArray = expenses.expenseList
      .sort((a, b) => {
        if (b.date > a.date) return 1;
        if (b.date < a.date) return -1;
        return 0;
      })
      .filter((item) => {
        const year = DateTime.fromISO(item.date).year;
        const month = DateTime.fromISO(item.date).month;
        return currentMonth === month && currentYear === year;
      });
    logger.info(`${req.user.username} Requested Expense Data`);
    // send only the processed array to the client
    return res.status(200).send(processedArray);
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// function to add new expense data
/*
  body: {
    category: string,
    amount: number,
    date: string,
    description: string,
    tags: string,
    receipt: File
  }
*/
export const addExpense = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  // multipart/form-data cant send arrays, need to parse string
  const tags =
    req.body.tags.length > 0
      ? req.body.tags.split(",").map((item: string) => {
          return item;
        })
      : [];
  // define initial values for if file does not exist
  let file = undefined;
  let fileName = null;
  if (req.files) {
    // Use 'express-fileupload' to get file
    file = req.files.receipt;
    // Generate random prefix for file name
    fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + file.name;
    // Check item mimetype to filter out non-image files
    if (!global.whitelist.includes(file.mimetype)) {
      logger.warn(`${req.user.username} Provided Bad File Format`);
      return res.json({ msg: "Bad file format" });
    } else {
      // use 'express-fileupload' to save file
      logger.info("Saved New Image To Server");
      file.mv(`./uploads/expenses/${fileName}`);
    }
  }
  // Validate data provided by the client
  const data = joiExpenseSchema.validate({
    category: req.body.category,
    amount: req.body.amount,
    date: req.body.date,
    description: req.body.description,
    tags: tags || [],
    receipt: fileName ? fileName : null,
  });

  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  // convert date from Date format so String
  const dateString = req.body.date.toString();

  try {
    // Add an expense by pushing new object into list
    const expenses = await ExpensesModel.findOneAndUpdate(
      { userid: req.user.id },
      {
        $push: {
          expenseList: { ...data.value, date: dateString },
        },
      }
    );
    logger.info(`${req.user.username} Added New Expense`);
    return res.status(201).json({ msg: "Added new Expense" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// function to edit current expense data
/*
  body: {
    _id: string, // of expense ebject that needs to be edited
    category: string,
    amount: number,
    date: string,
    description: string,
    tags: string,
    receipt: File
  }
*/
export const editExpense = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  // multipart/form-data cant send arrays, need to parse string
  // multipart/form-data cant send arrays, need to parse string
  const tags =
    req.body.tags.length > 0
      ? req.body.tags.split(",").map((item: string) => {
          return item;
        })
      : [];
  // Defining default values for variables
  let file = undefined;
  // Sets default value to already existing one as to not overwrite
  let fileName = req.body.receipt;
  if (req.files) {
    file = req.files.receipt;
    fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + file.name;
    if (!global.whitelist.includes(file.mimetype)) {
      logger.warn(`${req.user.username} Provided Bad File Format`);
      return res.set({ "Content-Type": file.mimetype }).json({ msg: "Bad file format" });
    } else {
      // Add new file
      // TODO: should also delete old file
      file.mv(`${global.__basedir}/uploads/expenses/${fileName}`);
    }
  }

  // Validate data provided by the client
  const data = joiExpenseSchema.validate({
    category: req.body.category,
    amount: req.body.amount,
    date: req.body.date,
    description: req.body.description,
    tags: tags || [],
    receipt: file ? fileName : null,
  });

  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
    // Match object in array and update values
    const expenses = await ExpensesModel.findOneAndUpdate(
      {
        expenseList: { $elemMatch: { _id: req.body._id } },
      },
      {
        $set: {
          "expenseList.$.category": req.body.category,
          "expenseList.$.amount": req.body.amount,
          "expenseList.$.date": req.body.date,
          "expenseList.$.description": req.body.description,
          "expenseList.$.tags": tags,
          "expenseList.$.receipt": fileName,
        },
      }
    );

    // Find which object was edited by _id
    // used to check if it has a receipt image assigned to it
    const editedObject = expenses.expenseList.find((item) => item._id.toString() === req.body._id);

    // If editing uses a new image, delete old one
    if (editedObject.receipt !== fileName) {
      if (fs.existsSync(global.__basedir + "/uploads/expenses/" + editedObject.receipt)) {
        fs.unlinkSync(global.__basedir + "/uploads/expenses/" + editedObject.receipt);
      }
    }

    logger.info(`${req.user.username} Edited Expense`);
    return res.status(201).json({ msg: "Edited expense successfully" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// function to delete current expense data
/*
  Params :id(string),
*/
export const deleteExpense = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  console.log(req.params.id);

  try {
    // Delete expense by pulling it from Array
    const expenses = await ExpensesModel.findOneAndUpdate(
      { userid: req.user.id },
      {
        $pull: { expenseList: { _id: req.params.id } },
      }
    );

    // Find which object was removed by _id
    // used to check if it has a receipt image assigned to it
    const deletedObject = expenses.expenseList.find(
      (item) => item._id.toString() === req.params.id
    );

    // If expense Object contained file name, remove that file
    if (deletedObject.receipt) {
      if (fs.existsSync(global.__basedir + "/uploads/expenses/" + deletedObject.receipt)) {
        fs.unlinkSync(global.__basedir + "/uploads/expenses/" + deletedObject.receipt);
      }
    }

    logger.info(`${req.user.username} Deleted Expense`);
    return res.status(200).json({ msg: "Deleted expense successfully" });
  } catch (error) {
    logger.error(error);
    return res.status(500);
  }
};
