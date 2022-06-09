import { ExpenseListItem } from "./ExpenseListItem";

const mockData = {
  category: "Unexpected",
  amount: 1223,
  date: new Date(),
  description: "This is a random description",
  tags: ["Dog", "Cat", "Cake"],
  receipt: "",
};

export default {
  title: "Expense List Item",
  component: ExpenseListItem,
};

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
      }}
    >
      <ExpenseListItem expenseData={mockData} />
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
      <ExpenseListItem expenseData={mockData} />
    </div>
  </html>
);
