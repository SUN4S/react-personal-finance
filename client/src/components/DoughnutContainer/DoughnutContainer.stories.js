import { DoughnutContainer } from "./DoughnutContainer";

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
];

export default {
  title: "Doughnut Container",
  component: DoughnutContainer,
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
      <DoughnutContainer budgetData={420} expenseData={mockData} />
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
      <DoughnutContainer budgetData={420} expenseData={mockData} />
    </div>
  </html>
);
