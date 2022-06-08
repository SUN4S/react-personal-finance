import "./ChartContainer.scss";

import { BudgetChart } from "../BudgetChart/BudgetChart";
import { useCurrentBudgetQuery } from "../../services/budget";

// Chart container currently does not have functionality
export const ChartContainer = () => {
  const budgetQuery = useCurrentBudgetQuery({});

  return (
    <div className="chartContainer">
      <BudgetChart
        data={budgetQuery.data}
        isFetching={true}
        isSuccess={budgetQuery.isSuccess}
      />
      <div className="chart">Monthly Expenditure: 0</div>
      <div className="chart">third</div>
      <div className="chart">four</div>
    </div>
  );
};
