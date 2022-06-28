import { ExpensesModel, joiExpenseSchema } from "../models/expenseSchema";
import {
  addExpense,
  deleteExpense,
  editExpense,
  getAllExpenses,
  getCurrentMonthExpenses,
} from "../controllers/ExpenseControllers";
import express, { Request, Response } from "express";

const router = express.Router();

// Return an array of ALL expenses
router.get("/", getAllExpenses);

// Return array of expenses for current ongoing Month
router.get("/currentMonth", getCurrentMonthExpenses);

// Add a new expense object
router.post("/addExpense", addExpense);

// Exit a single expense in array
router.put("/editExpense", editExpense);

// Delete an expense by _id
router.delete("/deleteExpense", deleteExpense);

module.exports = router;
