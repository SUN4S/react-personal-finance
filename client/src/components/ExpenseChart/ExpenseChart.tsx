import { BarChartContainer } from "../BarChartContainer/BarChartContainer";
import { ChartError } from "../ChartError/ChartError";
import { ExpenseChartProps } from "../../models/chart";
import { LoadingBox } from "../LoadingBox/LoadingBox";

// Component that houses subcomponents
export const ExpenseChart = ({
  expenseData,
  expenseIsFetching,
  expenseIsSuccess,
}: ExpenseChartProps) => {
  return (
    <div className="chart expenseChart">
      <div className="chartHeader">
        <h3>Expense Breakdown</h3>
      </div>
      <div className="chartBody">
        {expenseIsFetching ? (
          <LoadingBox size="xl" />
        ) : expenseIsSuccess && expenseData.length > 0 ? (
          <BarChartContainer expenseData={expenseData} />
        ) : (
          <ChartError title="No Data" />
        )}
      </div>
    </div>
  );
};
