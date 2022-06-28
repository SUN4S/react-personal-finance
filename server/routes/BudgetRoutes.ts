import { BudgetModel, joiBudgetSchema } from "../models/budgetSchema";
import {
  addBudget,
  editBudget,
  getAllBudgets,
  getCurrentBudget,
} from "../controllers/BudgetController";
import express, { Request, Response } from "express";

import logger from "../config/winston";

const router = express.Router();

// Return an array of all budgets
// Budgets are categorized by month ex. 2022-06
router.get("/", getAllBudgets);

// Return Current month budget
// Budgets are categorized by month ex. 2022-06
router.get("/currentBudget", getCurrentBudget);

// Adding a monthly budget for the user
router.post("/addBudget", addBudget);

// Edit current month budget
router.put("/editBudget", editBudget);

module.exports = router;
