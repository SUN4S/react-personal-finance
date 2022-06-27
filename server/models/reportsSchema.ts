import mongoose from "mongoose";

// let totalAmount = 0;
//       let essentialsAmount = 0;
//       let wantsAmount = 0;
//       let cultureAmount = 0;
//       let unexpectedAmount = 0;

const WeeklySchema = new mongoose.Schema(
  {
    totalAmount: { type: Number },
    essentialsAmount: { type: Number },
    wantsAmount: { type: Number },
    cultureAmount: { type: Number },
    unexpectedAmount: { type: Number },
    fromDate: {
      type: Date,
      default: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7),
    },
    toDate: { type: Date, default: new Date() },
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
      default: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}`,
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
