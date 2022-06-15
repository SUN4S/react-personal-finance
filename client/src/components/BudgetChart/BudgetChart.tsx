import "./BudgetChart.scss";

import { BudgetChartProps } from "../../models/chart";
import { BudgetForm } from "../BudgetForm/BudgetForm";
import { DoughnutContainer } from "../BudgetChartDoughnut/BudgetChartDoughnut";
import { LoadingBox } from "../LoadingBox/LoadingBox";

// Component to render budgetChart
export const BudgetChart = ({
  budgetData,
  expenseData,
  budgetIsFetching,
  budgetIsSuccess,
  expenseIsFetching,
  expenseIsSuccess,
}: BudgetChartProps) => {
  return (
    <div className="chart">
      <div className="chartHeader">
        <h3>Budget</h3>
      </div>
      <div className="chartBody">
        {budgetIsFetching || expenseIsFetching ? (
          <LoadingBox size="xl" />
        ) : budgetData &&
          budgetData.length > 0 &&
          budgetIsSuccess &&
          expenseIsSuccess ? (
          <DoughnutContainer
            budgetData={budgetData[0].budget}
            expenseData={expenseData}
          />
        ) : (
          <BudgetForm />
        )}
      </div>
    </div>
  );
};
