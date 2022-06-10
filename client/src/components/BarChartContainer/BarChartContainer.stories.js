import { BarChartContainer } from "./BarChartContainer";

const mockData = [
  {
    category: "Unexpected",
    amount: 10,
    date: new Date(),
    description: "This is a random description",
    tags: ["Dog", "Cat", "Cake"],
    receipt: "",
  },
  {
    category: "Wants",
    amount: 16,
    date: new Date(),
    description: "This is a random description",
    tags: ["Dog", "Cat", "Cake"],
    receipt: "",
  },
  {
    category: "Essentials",
    amount: 160,
    date: new Date(),
    description: "This is a random description",
    tags: ["Dog", "Cat", "Cake"],
    receipt: "",
  },
  {
    category: "Culture",
    amount: 50,
    date: new Date(),
    description: "This is a random description",
    tags: ["Dog", "Cat", "Cake"],
    receipt: "",
  },
];

export default {
  title: "Bar Chart Container",
  component: BarChartContainer,
};

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        width: "400px",
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <BarChartContainer expenseData={mockData} />
    </div>
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <div
      style={{
        width: "400px",
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <BarChartContainer expenseData={mockData} />
    </div>
  </html>
);
