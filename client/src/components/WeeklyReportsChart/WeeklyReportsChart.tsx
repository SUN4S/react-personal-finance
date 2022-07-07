import "./WeeklyReportsChart.scss";

import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const WeeklyReportsChart = (props: {
  totalAmount: number;
  spentAmount: number;
  color: string;
  name: string;
  shortText: boolean;
}) => {
  // data that will be represented in the chart
  // If remaining value is less than 0, then set it to 0
  const data = [
    { name: "Spent", value: props.spentAmount },
    {
      name: "Other",
      value: props.totalAmount - props.spentAmount,
    },
  ];
  // Colors that doughtnut chart will have
  const COLORS = [props.color, "var(--page-bg)"];

  return (
    <div className="WeeklyChartContainer" data-testid="weeklyChart">
      <ResponsiveContainer width={"99%"} minWidth={140} height={142}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill="transparent"
            paddingAngle={0}
            dataKey="value"
            style={{
              stroke: "none",
              paddingRight: "16px",
              width: "100%",
              minWidth: "140px",
            }}
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
                fontSize: "20px",
                fontWeight: "400",
                fill: "var(--text-primary)",
              }}
              // Checking if prop exists, to make sure it looks correct in provided space
              textLength={props.shortText ? "60px" : "90px"}
              lengthAdjust="spacingAndGlyphs"
              viewBox={{ width: 90, height: 20 }}
              value={props.name}
            />
          </Pie>
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
