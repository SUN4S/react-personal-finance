import { BudgetModel, joiBudgetSchema } from "../models/budgetSchema";
import express, { Request, Response } from "express";

import logger from "../config/winston";

export const getAllBudgets = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      const currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
      const budget = await BudgetModel.findOne({ userid: req.user.id });
      const data = await budget;
      logger.info(`${req.user.username} Requested Budged Data`);
      return res.status(200).send(data.budgetList);
    } catch (error) {
      logger.error(error.message);
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};

export const getCurrentBudget = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    try {
      const currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
      const budget = await BudgetModel.findOne({ userid: req.user.id });

      const data = await budget;
      // Filter out unnecessary data
      const currentBudget = data.budgetList.filter((item) => item.budgetDate == currentDate);
      logger.info(`${req.user.username} Requested Budged Data`);
      return res.status(200).send(currentBudget[0]);
    } catch (error) {
      logger.error(error.message);
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};

// It's only possible to have one budget per month
// TODO: Add an ability to select month interval
export const addBudget = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    // Validate if Provided data is correct
    const data = joiBudgetSchema.validate(req.body);
    if (data.error) {
      return res.status(400).json({ msg: data.error.message });
    }

    try {
      // Finds the object asociated with session user
      const uniqueBudget = BudgetModel.findOne({ userid: req.user.id }, async (err, list) => {
        // After finding the user, it filters by todays yyyy-mm
        const filteredByDate = list.budgetList.filter(
          (item) => item.budgetDate == new Date().getFullYear() + "-" + (new Date().getMonth() + 1)
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
              },
            },
          }
        );
        logger.info(`${req.user.username} Added New Budget`);
        return res.status(201).json({ msg: "Added new budget" });
      });
    } catch (error) {
      logger.error(error.message);
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};

export const editBudget = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    //Validate if provided data is correct
    const data = joiBudgetSchema.validate(req.body);
    if (data.error) {
      return res.json({ msg: data.error.message });
    }

    try {
      const budget = await BudgetModel.findOneAndUpdate(
        {
          budgetList: {
            $elemMatch: {
              budgetDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
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
    }
  } else {
    res.status(401).json({ msg: "Unauthorized access" });
  }
};
