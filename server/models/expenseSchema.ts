import Joi from "joi";
import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: new Date() },
    description: { type: String },
    tags: { type: [{ type: String }], default: [] },
    receipt: { type: String, Default: null },
  },
  { collection: "expenseList" }
);

const UserExpenses = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    expenseList: { type: [ExpenseSchema], default: Array },
  },
  { collection: "expenseList" }
);

export const joiExpenseSchema = Joi.object({
  category: Joi.string().valid("Essentials", "Wants", "Culture", "Unexpected").required(),
  amount: Joi.number().min(1).max(10000).required(),
  date: Joi.date(),
  description: Joi.string().min(0).max(200),
  tags: Joi.array().items(Joi.string()),
  receipt: Joi.string().allow(null),
});

export const ExpensesModel = mongoose.model("ExpensesModel", UserExpenses);
