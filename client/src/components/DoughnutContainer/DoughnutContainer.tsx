import "chart.js/auto";
import "./DoughnutContainer.scss";

import { ArcElement, Chart as ChartJS, Filler } from "chart.js";
import { useEffect, useState } from "react";

import { Doughnut } from "react-chartjs-2";
import { ExpenseState } from "../../models/expenses";
import { LoadingBox } from "../LoadingBox/LoadingBox";

ChartJS.register(ArcElement, Filler);

//TODO: Fix resize isue
// Currently chart container only increases in scale
// fix this bug, so it would also scale back down
// Reloading website on scaled up container fixes scaling issue

export const DoughnutContainer = (props: {
  budgetData: number;
  expenseData: Array<ExpenseState>;
}) => {
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let newAmount = 0;
    props.expenseData.map((item) => {
      newAmount += item.amount;
    });
    console.log(props.budgetData - expenseAmount);

    setExpenseAmount(newAmount);
    setRemainingBudget(props.budgetData - newAmount);
    setLoading(false);

    console.log(expenseAmount, remainingBudget);
  }, [props.budgetData, props.expenseData]);

  const data = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        label: "# Amount",
        data: [expenseAmount, remainingBudget < 0 ? 0 : remainingBudget],
        backgroundColor: ["#dc2626", "#22c55e"],
        borderColor: ["transparent", "transparent"],
      },
    ],
  };
  return (
    <div className="doughnutContainer">
      {loading ? (
        <LoadingBox size="xl" />
      ) : (
        <>
          <h3 className="doughnutCenter">{remainingBudget}</h3>
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "left",
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
};
