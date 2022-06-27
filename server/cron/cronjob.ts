import { ExpensesModel } from "../models/expensesSchema";
import cron from "cron";
import logger from "../config/winston";

// const job = new cron.CronJob(
//   "* * * * * *",
//   function () {
//     console.log("You will see this message every second");
//   },
//   null,
//   true,
//   "Europe/London"
// );

const getList = async () => {
  try {
    // Gets expense object
    const expenses = await ExpensesModel.find({});
    const data = await expenses;
    data.map((object) => {
      const totalAmount = object.expensesList
        .map((item) => item.amount)
        .reduce((prev, next) => prev + next);

      const essentialsAmount =
        object.expensesList
          .filter((item) => item.category === "Essentials")
          .map((item) => item.amount)
          .reduce((prev, next) => prev + next) || 0;

      const WantsAmount =
        object.expensesList
          .filter((item) => item.category === "Wants")
          .map((item) => item.amount)
          .reduce((prev, next) => prev + next) || 0;

      const cultureAmount =
        object.expensesList
          .filter((item) => item.category === "Culture")
          .map((item) => item.amount)
          .reduce((prev, next) => prev + next) || 0;

      const unexpectedAmount =
        object.expensesList
          .filter((item) => item.category === "Unexpected")
          .map((item) => item.amount)
          .reduce((prev, next) => prev + next) || 0;

      console.log(object);
      console.log(totalAmount);
      console.log(essentialsAmount);
      console.log(WantsAmount);
      console.log(cultureAmount);
      console.log(unexpectedAmount);
    });
  } catch (error) {
    logger.error(error.message);
  }
};

getList();
