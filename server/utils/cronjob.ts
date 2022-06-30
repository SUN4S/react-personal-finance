import { DateTime } from "luxon";
import { ExpensesModel } from "../models/expenseSchema";
import { ReportsModel } from "../models/reportsSchema";
import { UserModel } from "../models/userSchema";
import cron from "cron";
import { generateMonthlyExpenseEmail } from "./emailTemplates/monthlyReportTemplate";
import { generateWeeklyExpenseEmail } from "./emailTemplates/weeklyReportTemplate";
import logger from "../config/winston";

export const generateWeeklyReport = async () => {
  try {
    // Gets all expenses
    const expenses = await ExpensesModel.find({});
    const data = await expenses;
    data.map(async (object) => {
      let totalAmount = 0;
      let essentialsAmount = 0;
      let wantsAmount = 0;
      let cultureAmount = 0;
      let unexpectedAmount = 0;

      object.expenseList.length > 0 &&
        object.expenseList
          .filter(
            (item) =>
              DateTime.fromISO(item.date).toISO() >
                DateTime.now().minus({ week: 1 }).setZone("Europe/London").toISO() &&
              DateTime.fromISO(item.date).toISO() < DateTime.now().toISO()
          )
          .map((item) => {
            totalAmount += item.amount;
            switch (item.category) {
              case "Essentials":
                essentialsAmount += item.amount;
                break;
              case "Wants":
                wantsAmount += item.amount;
                break;
              case "Culture":
                cultureAmount += item.amount;
                break;
              case "Unexpected":
                unexpectedAmount += item.amount;
                break;
            }
          });

      try {
        await ReportsModel.findOneAndUpdate(
          { userid: object.userid },
          {
            $push: {
              weeklyReports: {
                totalAmount: totalAmount,
                essentialsAmount: essentialsAmount,
                wantsAmount: wantsAmount,
                cultureAmount: cultureAmount,
                unexpectedAmount: unexpectedAmount,
              },
            },
          }
        );
        const response = await UserModel.findById(object.userid);
        generateWeeklyExpenseEmail(response.email, response.username);
        logger.info(`Generated Weekly Report for ${object.userid}`);
      } catch (error) {
        logger.error(error.message);
      }
    });
  } catch (error) {
    logger.error(error.message);
  }
};

export const generateMonthlyReport = async () => {
  try {
    // Gets all expenses
    const expenses = await ExpensesModel.find({});
    const data = await expenses;
    data.map(async (object) => {
      let totalAmount = 0;
      let essentialsAmount = 0;
      let wantsAmount = 0;
      let cultureAmount = 0;
      let unexpectedAmount = 0;

      object.expenseList.length > 0 &&
        object.expenseList
          .filter(
            (item) =>
              DateTime.fromISO(item.date).toISO() >
                DateTime.now().minus({ month: 1 }).setZone("Europe/London").toISO() &&
              DateTime.fromISO(item.date).toISO() < DateTime.now().toISO()
          )
          .map((item) => {
            totalAmount += item.amount;
            switch (item.category) {
              case "Essentials":
                essentialsAmount += item.amount;
                break;
              case "Wants":
                wantsAmount += item.amount;
                break;
              case "Culture":
                cultureAmount += item.amount;
                break;
              case "Unexpected":
                unexpectedAmount += item.amount;
                break;
            }
          });

      try {
        await ReportsModel.findOneAndUpdate(
          { userid: object.userid },
          {
            $push: {
              monthlyReports: {
                totalAmount: totalAmount,
                essentialsAmount: essentialsAmount,
                wantsAmount: wantsAmount,
                cultureAmount: cultureAmount,
                unexpectedAmount: unexpectedAmount,
              },
            },
          }
        );
        const response = await UserModel.findById(object.userid);
        generateMonthlyExpenseEmail(response.email, response.username);
        logger.info(`Generated Weekly Report for ${object.userid}`);
      } catch (error) {
        logger.error(error.message);
      }
    });
  } catch (error) {
    logger.error(error.message);
  }
};

const weekly = new cron.CronJob("00 00 8 * * 0", generateWeeklyReport, null, true, "Europe/London");
const monthly = new cron.CronJob(
  `00 00 8 28-31 * *`,
  () => {
    if (isLastDayOfMonth()) {
      generateMonthlyReport();
    }
  },
  null,
  true,
  "Europe/London"
);

function isLastDayOfMonth() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (today.getMonth() !== tomorrow.getMonth()) {
    return true;
  } else {
    return false;
  }
}
