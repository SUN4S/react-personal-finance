import { BudgetModel, joiBudgetSchema } from "../models/budgetSchema";
import { Request, Response } from "express";

import { DateTime } from "luxon";
import logger from "../config/winston";

// function to get all budgets in an array
// uses PassportJS session to authenticate user
export const getAllBudgets = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  try {
    // call mongoose query to get Budget array by userid
    const budget = await BudgetModel.findOne({ userid: req.user.id });
    const data = await budget;
    
    logger.info(`${req.user.username} Requested Budged Data`);
    // send only the budgetlist that we received
    return res.status(200).send(data.budgetList);
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};

// function to get current monthly budget
// uses PassportJS session to authenticate user
export const getCurrentBudget = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
  try {
    // call mongoose query to get Budget array by userid
    const budget = await BudgetModel.findOne({ userid: req.user.id });
    const data = await budget;

    // Filter out unnecessary data
    const currentBudget = data.budgetList.filter(
      (item) => item.budgetDate == DateTime.now().toFormat("yyyy-MM")
    );
    
    logger.info(`${req.user.username} Requested Budged Data`);
    // send to client budget that matches current month
    return res.status(200).send(currentBudget[0]);
  } catch (error) {
    logger.error(error.message);
  }
};

// It's only possible to have one budget per month
// TODO: Add an ability to select month interval
/* 
  body: {
    budget: number;
  }
*/
export const addBudget = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ msg: "Unauthorized access" });
  }

  const budget = req.body.budget;

  // Validate if Provided data is correct
  const data = joiBudgetSchema.validate({ budget: budget });
  if (data.error) {
    return res.status(400).json({ msg: data.error.message });
  }

  try {
    // Finds the object asociated with session user
    const uniqueBudget = await BudgetModel.findOne({ userid: req.user.id });
    // After finding the user, it filters by todays yyyy-mm
    const filteredByDate = uniqueBudget.budgetList.filter(
      (item) => item.budgetDate == DateTime.now().toFormat("yyyy-MM")
    );

    // If budget exists, return msg
    if (filteredByDate.length > 0) {
      return res.status(202).json({ msg: "Budget already set" });
    }

    // If budget doesn't exist, add a new budget with todays yyyy-mm
    const budget = await BudgetModel.findOneAndUpdate(
      { userid: req.user.id },
      {
        $push: {
          budgetList: {
            budget: req.body.budget,
            budgetDate: DateTime.now().toFormat("yyyy-MM"),
          },
        },
      }
    );

    logger.info(`${req.user.username} Added New Budget`);
    return res.status(201).json({ msg: "Added new budget" });
  } catch (error) {
    logger.error(error.message);
  }
};

// function to edit current month budget
/* 
  body: {
    budget: number;
  }
*/
export const editBudget = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }

  const budget = req.body.budget;

  //Validate if provided data is correct
  const data = joiBudgetSchema.validate({ budget: budget });

  // check for joi error,
  // if error exists, break function
  if (data.error) {
    return res.json({ msg: data.error.message });
  }

  // find budget with the same date as at the time of query
  // when found, update with new budget amount
  try {
    const budget = await BudgetModel.findOneAndUpdate(
      {
        budgetList: {
          $elemMatch: {
            budgetDate: DateTime.now().toFormat("yyyy-MM"),
          },
        },
      },
      {
        $set: {
          "budgetList.$.budget": req.body.budget,
        },
      }
    );

    logger.info(`${req.user.username} Edited Budget`);
    return res.status(201).json({ msg: "Edited budget successfully" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500);
  }
};
