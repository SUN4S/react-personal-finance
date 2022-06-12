import "./ChartContainer.scss";

import { BudgetChart } from "../BudgetChart/BudgetChart";
import { BudgetChartProps } from "../../models/chart";
import { ExpenseChart } from "../ExpenseChart/ExpenseChart";

// Chart container used to house data visualization charts
export const ChartContainer = ({
  budgetData,
  expenseData,
  budgetIsFetching,
  budgetIsSuccess,
  expenseIsFetching,
  expenseIsSuccess,
}: BudgetChartProps) => {
  return (
    <div className="chartContainer">
      <BudgetChart
        budgetData={budgetData}
        expenseData={expenseData}
        budgetIsFetching={budgetIsFetching}
        budgetIsSuccess={budgetIsSuccess}
        expenseIsFetching={expenseIsFetching}
        expenseIsSuccess={expenseIsSuccess}
      />
      <ExpenseChart
        expenseData={expenseData}
        expenseIsFetching={expenseIsFetching}
        expenseIsSuccess={expenseIsSuccess}
      />
      <div className="chart weeklyChangeChart">third</div>
    </div>
  );
};
