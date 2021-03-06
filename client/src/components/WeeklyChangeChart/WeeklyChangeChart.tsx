import "./WeeklyChangeChart.scss";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { WeeklyChangeChartProps } from "../../models/reports";

// Creates a line chart to document weekly change
export const WeeklyChangeChart = (props: {
  chartData: Array<WeeklyChangeChartProps>;
}) => {
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
            interval={0}
            tickCount={5}
            domain={["auto", "auto"]}
            allowDecimals={false}
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
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
