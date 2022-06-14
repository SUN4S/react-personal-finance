import "./ChartContainer.scss";

import { BudgetChart } from "../../components/BudgetChart/BudgetChart";
import { ExpenseChart } from "../../components/ExpenseChart/ExpenseChart";
import { useCurrentBudgetQuery } from "../../services/budget";
import { useCurrentExpenseMonthQuery } from "../../services/expenses";

// Chart container used to house data visualization charts
export const ChartContainer = () => {
  // Redux Toolkit api Request to get expense array
  const currentExpensesQuery = useCurrentExpenseMonthQuery({});
  const budgetQuery = useCurrentBudgetQuery({});

  return (
    <div className="chartContainer">
      <BudgetChart
        budgetData={budgetQuery.data}
        expenseData={currentExpensesQuery.data}
        budgetIsFetching={budgetQuery.isFetching}
        budgetIsSuccess={budgetQuery.isSuccess}
        expenseIsFetching={currentExpensesQuery.isFetching}
        expenseIsSuccess={currentExpensesQuery.isSuccess}
      />
      <ExpenseChart
        expenseData={currentExpensesQuery.data}
        expenseIsFetching={currentExpensesQuery.isFetching}
        expenseIsSuccess={currentExpensesQuery.isSuccess}
      />
      <div className="chart weeklyChangeChart">third</div>
    </div>
  );
};
