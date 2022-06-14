import { ExpensesModel, joiExpenseSchema } from "../models/expensesSchema";
import express, { Request, Response } from "express";

import fs from "fs";
import logger from "../config/winston";

const router = express.Router();

// Return an array of ALL expenses
router.get("/", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      // Gets expense object
      const expenses = await ExpensesModel.findOne({ userid: req.user.id });
      const data = await expenses;
      logger.info(`${req.user.username} Requested Expense Data`);
      return res.status(200).send(data.expensesList);
    } catch (error) {
      logger.error(error);
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
});

// Return array of expenses for current ongoing Month
router.get("/currentMonth", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      // Gets expense object
      const expenses = await ExpensesModel.findOne({ userid: req.user.id });
      // Gets current month and year
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      // Filters and sorts array here instead of in the client
      const processedArray = expenses.expensesList
        .sort((a, b) => {
          if (b.date > a.date) return 1;
          if (b.date < a.date) return -1;
          return 0;
        })
        .filter((item) => {
          const year = new Date(item.date).getFullYear();
          const month = new Date(item.date).getMonth() + 1;
          return currentMonth === month && currentYear === year;
        });
      logger.info(`${req.user.username} Requested Expense Data`);
      return res.status(200).send(processedArray);
    } catch (error) {
      logger.error(error);
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
});

// Add a new expense object
router.post("/addExpense", async (req: Request, res: Response) => {
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
    if (data.error) {
      return res.status(400).json({ msg: data.error.message });
    }

    try {
      // Add an expense by pushing new object into list
      const expenses = await ExpensesModel.findOneAndUpdate(
        { userid: req.user.id },
        {
          $push: {
            expensesList: data.value,
          },
        }
      );
    } catch (error) {
      logger.error(error);
    }

    logger.info(`${req.user.username} Added New Expense`);
    return res.status(201).json({ msg: "Added new Expense" });
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
});

// Exit a single expense in array
router.put("/editExpense", async (req: Request, res: Response) => {
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
          expensesList: { $elemMatch: { _id: req.body._id } },
        },
        {
          $set: {
            "expensesList.$.category": req.body.category,
            "expensesList.$.amount": req.body.amount,
            "expensesList.$.date": req.body.date,
            "expensesList.$.description": req.body.description,
            "expensesList.$.tags": tags,
            "expensesList.$.receipt": fileName,
          },
        }
      );
    } catch (error) {
      logger.error(error);
    }
    logger.info(`${req.user.username} Edited Expense`);
    return res.status(201).json({ msg: "Edited expense successfully" });
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
});

// Delete an expense by _id
router.delete("/deleteExpense", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    // Delete expense by pulling it from Array
    const expenses = await ExpensesModel.findOneAndUpdate(
      { userid: req.user.id },
      {
        $pull: {
          expensesList: {
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
});

module.exports = router;
