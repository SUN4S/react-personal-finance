import "./DoughnutContainer.scss";

import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

import { ExpenseState } from "../../models/expenses";
import { LoadingBox } from "../LoadingBox/LoadingBox";

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

  const data = [
    { name: "Spent", value: expenseAmount },
    { name: "Remaining", value: remainingBudget < 0 ? 0 : remainingBudget },
  ];
  const COLORS = ["#dc2626", "#22c55e"];

  // const data = {
  //   labels: ["Spent", "Remaining"],
  //   datasets: [
  //     {
  //       label: "# Amount",
  //       data: [expenseAmount, remainingBudget < 0 ? 0 : remainingBudget],
  //       backgroundColor: ["#dc2626", "#22c55e"],
  //       borderColor: ["transparent", "transparent"],
  //     },
  //   ],
  // };
  return (
    <div className="doughnutContainer">
      {loading ? (
        <LoadingBox size="xl" />
      ) : (
        <ResponsiveContainer width="100%" minWidth="275px" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="70%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              fill="transparent"
              paddingAngle={0}
              dataKey="value"
              style={{ stroke: "none", paddingRight: "16px" }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                position="center"
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  fill: "var(--text-secondary)",
                  transform: "translateY(20px)",
                }}
              >
                Remaining
              </Label>
              <Label
                position="center"
                style={{
                  fontSize: "32px",
                  fontWeight: "600",
                  fill: "var(--text-primary)",
                }}
              >
                {remainingBudget}
              </Label>
            </Pie>
            <Legend
              layout="vertical"
              align="left"
              verticalAlign="middle"
              wrapperStyle={{
                display: "inline",
                width: "32px",
                paddingLeft: "16px",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--sidebar-bg)",
                padding: "0",
                border: "1px solid var(--text-secondary)",
                borderRadius: "5px",
              }}
              itemStyle={{
                color: "var(--text-primary)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
