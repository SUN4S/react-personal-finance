import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  budget: { type: Number, required: true },
  budgetDate: {
    type: String,
    default: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
  },
});

const UserBudget = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    budgetList: { type: [BudgetSchema], default: Array },
  },
  { collection: "budgetsList" }
);

export const BudgetModel = mongoose.model("BudgetModel", UserBudget);
