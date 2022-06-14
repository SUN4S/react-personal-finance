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

// Component that holds boughnut chart
export const DoughnutContainer = (props: {
  budgetData: number;
  expenseData: Array<ExpenseState>;
}) => {
  // State to save cumulative expsne value
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  // State to save change between budget and expenses
  const [remainingBudget, setRemainingBudget] = useState<number>(0);
  // State to manage load state
  const [loading, setLoading] = useState<boolean>(true);

  // On load and prop change fire function
  useEffect(() => {
    // Variable to store expense cumulative value
    let newAmount = 0;
    // Mapping though provided expense data and adding values to variable
    props.expenseData.map((item) => {
      newAmount += item.amount;
    });
    // Setting variable to expense state
    setExpenseAmount(newAmount);
    // Setting budget difference so state
    setRemainingBudget(props.budgetData - newAmount);
    // Setting loading state to false
    setLoading(false);
  }, [props.budgetData, props.expenseData]);

  // data that will be represented in the chart
  // If remaining value is less than 0, then set it to 0
  const data = [
    { name: "Spent", value: expenseAmount },
    { name: "Remaining", value: remainingBudget < 0 ? 0 : remainingBudget },
  ];
  // Colors that doughtnut chart will have
  const COLORS = ["#dc2626", "#22c55e"];

  return (
    <div className="doughnutContainer">
      {loading ? (
        <LoadingBox size="xl" />
      ) : (
        <ResponsiveContainer width="100%" minWidth="225px" height="100%">
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
                value="Remaining"
              />

              <Label
                position="center"
                style={{
                  fontSize: "28px",
                  fontWeight: "400",
                  fill: "var(--text-primary)",
                }}
                textLength="80px"
                lengthAdjust="spacingAndGlyphs"
                viewBox={{ width: 80, height: 20 }}
                value={remainingBudget.toFixed(2)}
              />
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
