import { ErrorText } from "../ErrorText/ErrorText";
import { ExpenseChartContainer } from "../ExpenseChartContainer/ExpenseChartContainer";
import { ExpenseChartProps } from "../../models/chart";
import { LoadingBox } from "../LoadingBox/LoadingBox";

// Component that houses subcomponents
export const ExpenseChart = ({
  expenseData,
  expenseIsFetching,
  expenseIsSuccess,
}: ExpenseChartProps) => {
  return (
    <div className="chart">
      <div className="chartHeader">
        <h3>Expense Breakdown</h3>
      </div>
      <div className="chartBody">
        {expenseIsFetching ? (
          <LoadingBox size="xl" />
        ) : expenseIsSuccess && expenseData.length > 0 ? (
          <ExpenseChartContainer expenseData={expenseData} />
        ) : (
          <ErrorText title="No Data" />
        )}
      </div>
    </div>
  );
};
