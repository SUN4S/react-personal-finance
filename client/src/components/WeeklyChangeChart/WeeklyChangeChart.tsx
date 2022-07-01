import "./WeeklyChangeChart.scss";

import {
  Cell,
  Label,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { WeeklyChangeChartProps } from "../../models/reports";

export const WeeklyChangeChart = (props: {
  chartData: Array<WeeklyChangeChartProps>;
}) => {
  console.log(props.chartData);
  return (
    <div className="lineChartContainer" data-testid="lineChart">
      <ResponsiveContainer width="100%" minWidth="200px" height="100%">
        <LineChart
          data={props.chartData}
          style={{ position: "relative", top: 8, right: 15 }}
        >
          <XAxis
            type="category"
            dataKey="date"
            tick={{ fontSize: 14, fill: "var(--text-secondary)" }}
          />
          <YAxis
            type="number"
            tick={{ fontSize: 14, fill: "var(--text-secondary)" }}
            tickCount={9}
            domain={["dataMin - 50", "dataMax + 50"]}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "var(--sidebar-bg)",
              padding: "4px 8px 0 8px",
              border: "1px solid var(--text-secondary)",
              color: "var(--text-primary)",
              borderRadius: "5px",
            }}
            itemStyle={{
              color: "var(--text-primary)",
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="rgb(34, 110, 197)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
