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
    { name: "Spent", value: props.expenseAmount },
    {
      name: "Remaining",
      value: props.remainingBudget < 0 ? 0 : props.remainingBudget,
    },
  ];
  // Colors that doughtnut chart will have
  const COLORS = ["#dc2626", "#22c55e"];

  return (
    <ResponsiveContainer width="100%" minWidth="225px" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="60%"
          cy="50%"
          innerRadius={45}
          outerRadius={70}
          fill="transparent"
          paddingAngle={0}
          dataKey="value"
          style={{ stroke: "none", paddingRight: "16px" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            value={props.remainingBudget.toFixed(2)}
          />
        </Pie>
        <Legend
          layout="vertical"
          align="left"
          verticalAlign="middle"
          wrapperStyle={{
            display: "inline",
            width: "130px",
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
  );
};
