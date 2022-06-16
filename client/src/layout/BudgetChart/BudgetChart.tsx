import "./BudgetChart.scss";

import { useEffect, useState } from "react";

import { BudgetChartForm } from "../BudgetChartForm/BudgetChartForm";
import { BudgetChartProps } from "../../models/chart";
import { BudgetDoughnutChart } from "../../components/BudgetDoughnutChart/BudgetDoughnutChart";
import { LoadingBox } from "../../components/LoadingBox/LoadingBox";

// Component to render budgetChart
export const BudgetChart = ({
  budgetData,
  expenseData,
  budgetIsFetching,
  budgetIsSuccess,
  expenseIsFetching,
  expenseIsSuccess,
}: BudgetChartProps) => {
  // State to save cumulative expsne value
  const [expenseAmount, setExpenseAmount] =
    useState<number | undefined>(undefined);
  // State to save change between budget and expenses
  const [remainingBudget, setRemainingBudget] =
    useState<number | undefined>(undefined);

  // On load and prop change fire function
  useEffect(() => {
    if (budgetData && expenseData) {
      // Variable to store expense cumulative value
      let newAmount = 0;
      // Mapping though provided expense data and adding values to variable
      expenseData.map((item) => {
        newAmount += item.amount;
      });
      // Setting variable to expense state
      setExpenseAmount(newAmount);
      // Setting budget difference so state
      setRemainingBudget(budgetData.budget - newAmount);
    }
  }, [budgetData, expenseData]);

  return (
    <div className="chart">
      <div className="chartHeader">
        <h3>Budget</h3>
      </div>
      <div className="chartBody">
        {expenseIsFetching || budgetIsFetching ? (
          <LoadingBox size="xl" />
        ) : (
          <div className="doughnutContainer">
            {budgetIsSuccess &&
            expenseIsSuccess &&
            expenseAmount &&
            remainingBudget ? (
              <BudgetDoughnutChart
                expenseAmount={expenseAmount}
                remainingBudget={remainingBudget}
              />
            ) : (
              <BudgetChartForm />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
