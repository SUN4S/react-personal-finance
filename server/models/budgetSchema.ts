import { DateTime } from "luxon";
import Joi from "joi";
import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  budget: { type: Number, required: true },
  budgetDate: {
    type: String,
  },
});

const UserBudget = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    budgetList: { type: [BudgetSchema], default: Array },
  },
  { collection: "budgetList" }
);

export const joiBudgetSchema = Joi.object({
  budget: Joi.number().min(1).max(10000).required(),
});

export const BudgetModel = mongoose.model("BudgetModel", UserBudget);
