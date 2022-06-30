import { ExpensesModel } from "../models/expenseSchema";
import { ReportsModel } from "../models/reportsSchema";
import cron from "cron";
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
              item.date >
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate() - 7
                ) && item.date < new Date()
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
        const response = await ReportsModel.findOneAndUpdate(
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
