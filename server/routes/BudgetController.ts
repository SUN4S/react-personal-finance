import { BudgetModel, joiBudgetSchema } from "../models/budgetSchema";
import express, { Request, Response } from "express";

import Joi from "joi";

const router = express.Router();

// Return an array of all budgets
// Budgets are categorized by month ex. 2022-06
router.get("/", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const budget = await BudgetModel.findOne({ userid: req.user.id });
    const data = await budget;
    return res.status(200).send(data.budgetList);
  }
  res.status(401).json({ msg: "Unauthorized access" });
});

// Adding a monthly budget for the user
// It's only possible to have one budget per month
// TODO: Add an ability to select month interval

router.post("/addBudget", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    // Validate if Provided data is correct
    const data = joiBudgetSchema.validate(req.body);
    if (data.error) {
      return res.status(400).json({ msg: data.error.message });
    }

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
      return res.status(201).json({ msg: "Added new budget" });
    });
  } else {
    // Return Authentication error
    res.status(401).json({ msg: "Unauthorized access" });
  }
});

// Edit current month budget
// no ability to change previous budgets
router.put("/editBudget", async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    //Validate if provided data is correct
    const data = joiBudgetSchema.validate(req.body);
    if (data.error) {
      return res.json({ msg: data.error.message });
    }

    const budget = await BudgetModel.findOneAndUpdate(
      {
        budgetList: {
          $elemMatch: { budgetDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) },
        },
      },
      {
        $set: {
          "budgetList.$.budget": req.body.budget,
        },
      }
    );
    return res.status(201).json({ msg: "Edited budget successfully" });
  }
  res.status(401).json({ msg: "Unauthorized access" });
});

module.exports = router;
