import mongoose from "mongoose";

const ExpensesSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: new Date() },
    description: { type: String },
    tags: { type: [{ type: String }], default: [] },
    receipt: { type: String, Default: null },
  },
  { collection: "expensesList" }
);

const UserExpenses = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    expensesList: { type: [ExpensesSchema], default: Array },
  },
  { collection: "expensesList" }
);

export const ExpensesModel = mongoose.model("ExpensesModel", UserExpenses);
