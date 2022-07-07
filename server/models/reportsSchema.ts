import { DateTime } from "luxon";
import mongoose from "mongoose";

const WeeklySchema = new mongoose.Schema(
  {
    totalAmount: { type: Number },
    essentialsAmount: { type: Number },
    wantsAmount: { type: Number },
    cultureAmount: { type: Number },
    unexpectedAmount: { type: Number },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
  },
  { collection: "expenseReports" }
);

const MonthlySchema = new mongoose.Schema(
  {
    totalAmount: { type: Number },
    essentialsAmount: { type: Number },
    wantsAmount: { type: Number },
    cultureAmount: { type: Number },
    unexpectedAmount: { type: Number },
    monthDate: {
      type: String,
    },
  },
  { collection: "expenseReports" }
);

const ExpenseReports = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    weeklyReports: { type: [WeeklySchema], default: Array },
    monthlyReports: { type: [MonthlySchema], default: Array },
  },
  { collection: "expenseReports" }
);

export const ReportsModel = mongoose.model("ExpensesReports", ExpenseReports);
