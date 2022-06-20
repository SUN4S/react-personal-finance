import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataObject {
  name: string;
  value: number;
}

// TODO: Fix Reference chart bug, where one line is thinner
// Only visually, might just be browser rendering glitch or smth

export const ExpenseBarChart = (props: { chartData: Array<DataObject> }) => {
  // Colors for barchart bars
  const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#a2b321"];

  return (
    <ResponsiveContainer width="100%" minWidth="225px" height="100%">
      <BarChart data={props.chartData} layout="vertical">
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name"
          width={80}
          tick={{ fontSize: 14, fill: "var(--text-secondary)" }}
        />
        <Tooltip
          cursor={false}
          contentStyle={{
            backgroundColor: "var(--sidebar-bg)",
            padding: "0",
            border: "1px solid var(--text-secondary)",
            color: "var(--text-primary)",
            borderRadius: "5px",
          }}
          itemStyle={{
            color: "var(--text-primary)",
          }}
        />
        {props.chartData.map(
          (entry, index) =>
            entry.value > 0 && (
              <ReferenceLine
                key={index}
                segment={[
                  { x: entry.value, y: entry.name },
                  { x: entry.value, y: props.chartData[3].name },
                ]}
                stroke="var(--text-secondary)"
                strokeWidth={1}
                isFront={false}
                style={{
                  transform: "translateY(12px) translateX(-1px)",
                }}
              />
            )
        )}
        <Bar dataKey="value">
          {props.chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};