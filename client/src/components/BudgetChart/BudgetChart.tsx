import "./BudgetChart.scss";

import { useEffect, useState } from "react";

import { BudgetProps } from "../../models/budget";
import { DoughnutContainer } from "../DoughnutContainer/DoughnutContainer";
import { LoadingBox } from "../LoadingBox/LoadingBox";

export const BudgetChart = ({
  budgetData,
  expenseData,
  budgetIsFetching,
  budgetIsSuccess,
  expenseIsFetching,
  expenseIsSuccess,
}: BudgetProps) => {
  return (
    <div className="chart budgetChart">
      <div className="budgetChartHeader">
        <h3>Budget</h3>
      </div>
      <div className="budgetChartBody">
        {budgetIsFetching && expenseIsFetching ? (
          <LoadingBox size="lg" />
        ) : budgetData &&
          budgetData.length > 0 &&
          budgetIsSuccess &&
          expenseIsSuccess ? (
          <DoughnutContainer
            budgetData={budgetData[0].budget}
            expenseData={expenseData}
          />
        ) : (
          <h3>No Data</h3>
        )}
      </div>
    </div>
  );
};
