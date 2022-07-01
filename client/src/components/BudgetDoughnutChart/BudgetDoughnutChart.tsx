import "./BudgetDoughnutChart.scss";

import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const BudgetDoughnutChart = (props: {
  expenseAmount: Number;
  remainingBudget: Number;
}) => {
  // data that will be represented in the chart
  // If remaining value is less than 0, then set it to 0
  const data = [
    {
      name: "Remaining",
      value: props.remainingBudget < 0 ? 0 : props.remainingBudget,
    },
    { name: "Spent", value: props.expenseAmount },
  ];
  // Colors that doughtnut chart will have
  const COLORS = ["#dc2626", "#22c55e"];

  return (
    <div className="doughnutChartContainer" data-testid="doughnutChart">
      <ResponsiveContainer width="100%" minWidth="200px" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="52%"
            innerRadius={45}
            outerRadius={62}
            fill="transparent"
            paddingAngle={0}
            dataKey="value"
            style={{ stroke: "none", paddingRight: "16px", minWidth: "140px" }}
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
                fontSize: "28px",
                fontWeight: "400",
                fill: "var(--text-primary)",
              }}
              textLength="80px"
              lengthAdjust="spacingAndGlyphs"
              viewBox={{ width: 80, height: 20 }}
              value={props.remainingBudget?.toFixed(2)}
            />
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
          </Pie>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              width: "100%",
              whiteSpace: "nowrap",
              fontSize: 14,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--sidebar-bg)",
              padding: "4px 8px",
              border: "1px solid var(--text-secondary)",
              borderRadius: "5px",
            }}
            itemStyle={{
              color: "var(--text-primary)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
