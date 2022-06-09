import { ExpenseList } from "./ExpenseList";

const mockData = [
  {
    category: "Unexpected",
    amount: 1223,
    date: new Date(),
    description: "This is a random description",
    tags: ["Dog", "Cat", "Cake"],
    receipt: "",
  },
  {
    category: "Wants",
    amount: 15,
    date: new Date(),
    description: "Baught a T-shirt",
    tags: ["T-Shirt"],
    receipt: "",
  },
  {
    category: "Culture",
    amount: 12,
    date: new Date(),
    description: "This is a Cake",
    tags: ["Dog", "Expensive"],
    receipt: "",
  },
];

export default {
  title: "Expense List",
  component: ExpenseList,
};

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
      }}
    >
      <ExpenseList data={mockData} />
    </div>
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
      }}
    >
      <ExpenseList data={mockData} />
    </div>
  </html>
);
