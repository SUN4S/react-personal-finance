import { ExpensesModel, joiExpenseSchema } from "../models/expenseSchema";
import { Request, Response } from "express";

import { DateTime } from "luxon";
import fs from "fs";
import logger from "../config/winston";

// function to get all expenses Array
// uses PassportJS session to authenticate user
export const getAllExpenses = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
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
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};

// function to get current month expenses
// uses PassportJS session to authenticate user
export const getCurrentMonthExpenses = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
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
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
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
  if (req.isAuthenticated()) {
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
    const dateString = req.body.date.toString();
    if (data.error) {
      return res.status(400).json({ msg: data.error.message });
    } else {
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
      }
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
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
  if (req.isAuthenticated()) {
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
    } catch (error) {
      logger.error(error.message);
    }
    logger.info(`${req.user.username} Edited Expense`);
    return res.status(201).json({ msg: "Edited expense successfully" });
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};

// function to delete current expense data
/*
  body: {
    _id: string, // of expense ebject that needs to be deleted
  }
*/
export const deleteExpense = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    // Delete expense by pulling it from Array
    const expenses = await ExpensesModel.findOneAndUpdate(
      { userid: req.user.id },
      {
        $pull: {
          expenseList: {
            _id: req.body._id,
          },
        },
      }
    )
      .then((response) => {
        // If expense Object contained file name, remove that file
        if (req.body.receipt) {
          if (fs.existsSync(global.__basedir + "/uploads/expenses/" + req.body.receipt)) {
            fs.unlinkSync(global.__basedir + "/uploads/expenses/" + req.body.receipt);
          }
        }
      })
      .then((error) => {
        logger.error(error);
      });

    logger.info(`${req.user.username} Deleted Expense`);
    return res.status(200).json({ msg: "Deleted expense successfully" });
  }
  res.status(401).json({ msg: "Unauthorized access" });
};
