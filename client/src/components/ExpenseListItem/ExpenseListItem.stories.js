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
    <ExpenseListItem expenseData={mockData} />
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <ExpenseListItem expenseData={mockData} />
  </html>
);
