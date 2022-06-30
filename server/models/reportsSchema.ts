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
      default: DateTime.now().minus({ week: 1 }).setZone("Europe/London").toISO(),
    },
    toDate: { type: Date, default: DateTime.now().setZone("Europe/London").toISO() },
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
      default: `${DateTime.now().toFormat("yyyy-MM")}`,
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
