import "./ChartContainer.scss";

import { BudgetChart } from "../BudgetChart/BudgetChart";
import { useCurrentBudgetQuery } from "../../services/budget";
import { useCurrentExpenseMonthQuery } from "../../services/expenses";

// Chart container currently does not have functionality
export const ChartContainer = () => {
  const budgetQuery = useCurrentBudgetQuery({});
  const currentExpenseQuery = useCurrentExpenseMonthQuery({});

  return (
    <div className="chartContainer">
      <BudgetChart
        budgetData={budgetQuery.data}
        expenseData={currentExpenseQuery.data}
        budgetIsFetching={budgetQuery.isFetching}
        budgetIsSuccess={budgetQuery.isSuccess}
        expenseIsFetching={currentExpenseQuery.isFetching}
        expenseIsSuccess={currentExpenseQuery.isSuccess}
      />
      <div className="chart">Monthly Expenditure: 0</div>
      <div className="chart">third</div>
    </div>
  );
};
