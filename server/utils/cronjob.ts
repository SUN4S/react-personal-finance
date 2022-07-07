import { DateTime } from "luxon";
import { ExpensesModel } from "../models/expenseSchema";
import { ReportsModel } from "../models/reportsSchema";
import { UserModel } from "../models/userSchema";
import cron from "cron";
import { generateMonthlyExpenseEmail } from "./emailTemplates/monthlyReportTemplate";
import { generateWeeklyExpenseEmail } from "./emailTemplates/weeklyReportTemplate";
import logger from "../config/winston";

// function to generate weekly report data
// called using cronJob
export const generateWeeklyReport = async () => {
  try {
    // Gets all expenses
    const expenses = await ExpensesModel.find({});
    const data = await expenses;
    // map through data objects
    data.map(async (object) => {
      let totalAmount = 0;
      let essentialsAmount = 0;
      let wantsAmount = 0;
      let cultureAmount = 0;
      let unexpectedAmount = 0;

      // check if users expenseList has any entries
      object.expenseList.length > 0 &&
        object.expenseList
          .filter(
            // filter expense list by date,
            // luxon allows to easily subtract 1 week from current date
            (item) =>
              DateTime.fromISO(item.date).toISO() >
                DateTime.now().minus({ week: 1 }).setZone("Europe/London").toISO() &&
              DateTime.fromISO(item.date).toISO() < DateTime.now().toISO()
          )
          // after filtering, map through new array
          // add expense list amount to corresponding variable amount
          .map((item) => {
            // add all amount to total
            totalAmount += item.amount;
            // switch to add to corrent ammount variables
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
        // mongoose query to push generated data to database by userid
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
                fromDate: DateTime.now().minus({ week: 1 }).setZone("Europe/London").toISO(),
                toDate: DateTime.now().minus({ week: 1 }).setZone("Europe/London").toISO(),
              },
            },
          }
        );
        // mongoose query to get more information about current user
        const response = await UserModel.findById(object.userid);
        // generate and email with provided email address and username
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

// function to generate montlhly report data
// called using cronJob
export const generateMonthlyReport = async () => {
  try {
    // Gets all expenses
    const expenses = await ExpensesModel.find({});
    const data = await expenses;
    // map through data objects
    data.map(async (object) => {
      let totalAmount = 0;
      let essentialsAmount = 0;
      let wantsAmount = 0;
      let cultureAmount = 0;
      let unexpectedAmount = 0;

      // check if users expenseList has any entries
      object.expenseList.length > 0 &&
        object.expenseList
          .filter(
            // filter expense list by date,
            // luxon allows to easily subtract 1 month from current date
            (item) =>
              DateTime.fromISO(item.date).toISO() >
                DateTime.now().minus({ month: 1 }).setZone("Europe/London").toISO() &&
              DateTime.fromISO(item.date).toISO() < DateTime.now().toISO()
          )
          // after filtering, map through new array
          // add expense list amount to corresponding variable amount
          .map((item) => {
            // add all amount to total
            totalAmount += item.amount;
            // switch to add to corrent ammount variables
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

      // mongoose query to push generated data to database by userid
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
                monthDate: `${DateTime.now().toFormat("yyyy-MM")}`,
              },
            },
          }
        );
        // mongoose query to get more information about current user
        const response = await UserModel.findById(object.userid);
        // generate and email with provided email address and username
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

// cronjob function that is called every Sunday at 8:00 London time
const weekly = new cron.CronJob("00 00 8 * * 0", generateWeeklyReport, null, true, "Europe/London");
// cronjob function that is called on last day of the month at 8:00 London time
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

// function to check if it is currently the last day of the month
const isLastDayOfMonth = () => {
  const today = DateTime.now().setZone("Europe/London");
  const tomorrow = DateTime.now().setZone("Europe/London").plus({ days: 1 });

  // if tomorrows date changes month,
  // it's the last day of the month
  if (today.month !== tomorrow.month) {
    return true;
  } else {
    return false;
  }
};
