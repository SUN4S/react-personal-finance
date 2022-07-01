import "./ChartContainer.scss";

import { BudgetChartContainer } from "../BudgetChartContainer/BudgetChartContainer";
import { ExpenseChartContainer } from "../ExpenseChartContainer/ExpenseChartContainer";
import { RootState } from "../../app/store";
import { WeeklyChangeChartContainer } from "../WeeklyChangeChartContainer/WeeklyChangeChartContainer";
import { useCurrentBudgetQuery } from "../../services/budget";
import { useCurrentExpenseMonthQuery } from "../../services/expenses";
import { useWeeklyReportsQuery } from "../../services/reports";

// Chart container used to house data visualization charts
export const ChartContainer = () => {
  // Redux Toolkit api Request to get expense array
  const currentExpensesQuery = useCurrentExpenseMonthQuery({});
  const budgetQuery = useCurrentBudgetQuery({});
  const weeklyReportsQuery = useWeeklyReportsQuery({});

  return (
    <div className="chartContainer">
      <BudgetChartContainer
        budgetData={budgetQuery.data}
        expenseData={currentExpensesQuery.data}
        budgetIsFetching={budgetQuery.isFetching}
        budgetIsSuccess={budgetQuery.isSuccess}
        expenseIsFetching={currentExpensesQuery.isFetching}
        expenseIsSuccess={currentExpensesQuery.isSuccess}
      />
      <ExpenseChartContainer
        expenseData={currentExpensesQuery.data}
        expenseIsFetching={currentExpensesQuery.isFetching}
        expenseIsSuccess={currentExpensesQuery.isSuccess}
      />
      <WeeklyChangeChartContainer
        weeklyData={weeklyReportsQuery.data}
        weeklyIsFetching={weeklyReportsQuery.isFetching}
        weeklyIsSuccess={weeklyReportsQuery.isSuccess}
      />
    </div>
  );
};
