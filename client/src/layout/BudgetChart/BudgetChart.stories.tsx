import { Meta, Story } from "@storybook/react/types-6-0";
import { mockBudget, mockExpense } from "../../resources/mockData";

import { BudgetChart } from "./BudgetChart";
import { BudgetState } from "../../models/budget";
import { ExpenseState } from "../../models/expenses";

interface TemplateProps {
  theme: string;
  budgetData: BudgetState;
  expenseData: ExpenseState[];
  budgetIsFetching: boolean;
  budgetIsSuccess: boolean;
  expenseIsFetching: boolean;
  expenseIsSuccess: boolean;
}

export default {
  title: "Layout/Budget Chart",
  component: BudgetChart,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body className="chartContainer">
        <BudgetChart
          budgetData={args.budgetData}
          expenseData={args.expenseData}
          budgetIsFetching={args.budgetIsFetching}
          budgetIsSuccess={args.budgetIsSuccess}
          expenseIsFetching={args.expenseIsFetching}
          expenseIsSuccess={args.expenseIsSuccess}
        />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  budgetData: mockBudget,
  expenseData: mockExpense,
  budgetIsFetching: false,
  budgetIsSuccess: true,
  expenseIsFetching: false,
  expenseIsSuccess: true,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  budgetData: mockBudget,
  expenseData: mockExpense,
  budgetIsFetching: false,
  budgetIsSuccess: true,
  expenseIsFetching: false,
  expenseIsSuccess: true,
};
