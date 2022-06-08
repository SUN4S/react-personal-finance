import "./BudgetChart.scss";

import { BudgetProps } from "../../models/budget";
import { LoadingBox } from "../LoadingBox/LoadingBox";

export const BudgetChart = ({ data, isFetching, isSuccess }: BudgetProps) => {
  return (
    <div className="chart budgetChart">
      <div className="budgetChartHeader">
        <h3>Budget</h3>
      </div>
      <div className="budgetChartBody">
        {isFetching ? (
          <LoadingBox size="lg" />
        ) : data.length > 0 && isSuccess ? (
          <h3>{data[0].budget}</h3>
        ) : (
          <h3>No Data</h3>
        )}
      </div>
    </div>
  );
};
