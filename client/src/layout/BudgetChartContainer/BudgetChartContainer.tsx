import "./BudgetChartContainer.scss";

import { useEffect, useState } from "react";

import { BudgetChartForm } from "../BudgetChartForm/BudgetChartForm";
import { BudgetChartProps } from "../../models/chart";
import { BudgetDoughnutChart } from "../../components/BudgetDoughnutChart/BudgetDoughnutChart";
import { IconEdit } from "../../resources/icons/IconEdit/IconEdit";
import { LoadingBox } from "../../components/LoadingBox/LoadingBox";

// Component to render budgetChart
export const BudgetChartContainer = ({
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
  // State to check if user wants to change current month budget
  const [editable, setEditable] = useState<boolean>(false);

  // On load and prop change fire function
  useEffect(() => {
    // Variable to store expense cumulative value
    let newAmount = 0;
    // Mapping though provided expense data and adding values to variable
    expenseData?.map((item) => {
      newAmount += item.amount;
    });
    // Setting variable to expense state
    setExpenseAmount(Number(newAmount.toFixed(2)));
    // Setting budget difference so state
    setRemainingBudget(Number((budgetData?.budget - newAmount).toFixed(2)));
  }, [budgetData, expenseData]);

  return (
    <div className="chart">
      <div className="chartHeader">
        <h3>Budget</h3>
        <div className="editButton" onClick={() => setEditable(!editable)}>
          <IconEdit />
        </div>
      </div>
      <div className="chartBody">
        {expenseIsFetching || budgetIsFetching ? (
          <LoadingBox size="xl" />
        ) : (
          <div className="doughnutContainer">
            {budgetIsSuccess &&
            expenseIsSuccess &&
            budgetData.budget &&
            !editable ? (
              <BudgetDoughnutChart
                expenseAmount={expenseAmount!}
                remainingBudget={remainingBudget!}
              />
            ) : (
              <BudgetChartForm
                editable={editable}
                closeFunction={() => setEditable(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
