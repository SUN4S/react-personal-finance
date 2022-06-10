import { ChartContainer } from "./ChartContainer";

const initBudgetData = [
  {
    _id: "1234",
    budget: 645,
    budgetDate: "2022-06",
  },
];

const initExpenseData = [
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
  title: "Chart Container",
  component: ChartContainer,
};

// budgetData={budgetQuery.data}
//           expenseData={currentExpensesQuery.data}
//           budgetIsFetching={budgetQuery.isFetching}
//           budgetIsSuccess={budgetQuery.isSuccess}
//           expenseIsFetching={currentExpensesQuery.isFetching}
//           expenseIsSuccess={currentExpensesQuery.isSuccess}

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <ChartContainer
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

export const Default_Light_Loading = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <ChartContainer
        budgetData={initBudgetData}
        expenseData={initExpenseData}
        budgetIsFetching={true}
        budgetIsSuccess={false}
        expenseIsFetching={true}
        expenseIsSuccess={false}
      />
    </div>
  </html>
);

export const Default_Light_No_Data = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <ChartContainer
        budgetData={initBudgetData}
        expenseData={initExpenseData}
        budgetIsFetching={false}
        budgetIsSuccess={false}
        expenseIsFetching={false}
        expenseIsSuccess={false}
      />
    </div>
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <ChartContainer
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

export const Default_Dark_Loading = () => (
  <html data-theme="dark">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <ChartContainer
        budgetData={initBudgetData}
        expenseData={initExpenseData}
        budgetIsFetching={true}
        budgetIsSuccess={false}
        expenseIsFetching={true}
        expenseIsSuccess={false}
      />
    </div>
  </html>
);

export const Default_Dark_No_Data = () => (
  <html data-theme="dark">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <ChartContainer
        budgetData={initBudgetData}
        expenseData={initExpenseData}
        budgetIsFetching={false}
        budgetIsSuccess={false}
        expenseIsFetching={false}
        expenseIsSuccess={false}
      />
    </div>
  </html>
);
