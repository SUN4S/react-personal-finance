import { ExpenseChart } from "./ExpenseChart";

export default {
  title: "Expense Chart",
  component: ExpenseChart,
};

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

export const Default_Light = () => (
  <html data-theme="light">
    <div className="chartContainer">
      <ExpenseChart
        expenseData={mockData}
        expenseIsFetching={false}
        expenseIsSuccess={true}
      />
    </div>
  </html>
);

export const Default_Light_Loading = () => (
  <html data-theme="light">
    <div className="chartContainer">
      <ExpenseChart
        expenseData={mockData}
        expenseIsFetching={true}
        expenseIsSuccess={true}
      />
    </div>
  </html>
);

export const Default_Light_NoData = () => (
  <html data-theme="light">
    <div className="chartContainer">
      <ExpenseChart
        expenseData={mockData}
        expenseIsFetching={false}
        expenseIsSuccess={false}
      />
    </div>
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <div className="chartContainer">
      <ExpenseChart
        expenseData={mockData}
        expenseIsFetching={false}
        expenseIsSuccess={true}
      />
    </div>
  </html>
);

export const Default_Dark_Loading = () => (
  <html data-theme="dark">
    <div className="chartContainer">
      <ExpenseChart
        expenseData={mockData}
        expenseIsFetching={true}
        expenseIsSuccess={true}
      />
    </div>
  </html>
);

export const Default_Dark_NoData = () => (
  <html data-theme="dark">
    <div className="chartContainer">
      <ExpenseChart
        expenseData={mockData}
        expenseIsFetching={false}
        expenseIsSuccess={false}
      />
    </div>
  </html>
);
