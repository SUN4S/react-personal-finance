import { BudgetChart } from "./BudgetChart";

export default {
  title: "Budget Chart",
  component: BudgetChart,
};

const initBudgetData = [
  {
    _id: "1234",
    budget: 645,
    budgetDate: "2022-06",
  },
];

const initExpenseData = [
  {
    _id: "9876",
    category: "Unexpected",
    amount: 36,
    date: new Date(),
    tags: ["Dog", "Cat"],
    description: "This is a description",
    receipt: "",
  },
];

export const Default_Light = () => (
  <html data-theme="light">
    <div style={{ width: "400px" }}>
      <BudgetChart
        budgetData={initBudgetData}
        expenseData={initExpenseData}
        budgetIsFetching={false}
        budgetIsSuccess={true}
        expenseIsFetching={false}
        expenseIsSuccess={true}
      />
    </div>
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <div style={{ width: "400px", backgroundColor: "#0f172a" }}>
      <BudgetChart
        budgetData={initBudgetData}
        expenseData={initExpenseData}
        budgetIsFetching={false}
        budgetIsSuccess={true}
        expenseIsFetching={false}
        expenseIsSuccess={true}
      />
    </div>
  </html>
);
