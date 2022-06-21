import "./ChartContainer.scss";

import { BudgetChart } from "../BudgetChart/BudgetChart";
import { ExpenseChart } from "../ExpenseChart/ExpenseChart";
import { useCurrentBudgetQuery } from "../../services/budget";
import { useCurrentExpenseMonthQuery } from "../../services/expenses";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

// Chart container used to house data visualization charts
export const ChartContainer = () => {
  // Redux Toolkit api Request to get expense array
  const currentExpensesQuery = useCurrentExpenseMonthQuery({});
  const budgetQuery = useCurrentBudgetQuery({});

  // Redux Toolkit accessing store to fetch data
  const expenses = useSelector((state: RootState) => state.expenses.data);
  const budget = useSelector((state: RootState) => state.budget.data);

  return (
    <div className="chartContainer">
      <BudgetChart
        budgetData={budget}
        expenseData={expenses}
        budgetIsFetching={budgetQuery.isFetching}
        budgetIsSuccess={budgetQuery.isSuccess}
        expenseIsFetching={currentExpensesQuery.isFetching}
        expenseIsSuccess={currentExpensesQuery.isSuccess}
      />
      <ExpenseChart
        expenseData={expenses}
        expenseIsFetching={currentExpensesQuery.isFetching}
        expenseIsSuccess={currentExpensesQuery.isSuccess}
      />
      <div className="chart weeklyChangeChart">third</div>
    </div>
  );
};
