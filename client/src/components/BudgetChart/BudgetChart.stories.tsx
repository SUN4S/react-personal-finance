import { Meta, Story } from "@storybook/react/types-6-0";

import { BudgetChart } from "./BudgetChart";
import { BudgetState } from "../../models/budget";
import { ExpenseState } from "../../models/expenses";

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

interface TemplateProps {
  theme: string;
  budgetData: BudgetState[];
  expenseData: ExpenseState[];
  budgetIsFetching: boolean;
  budgetIsSuccess: boolean;
  expenseIsFetching: boolean;
  expenseIsSuccess: boolean;
}

export default {
  title: "Components/Budget Chart",
  component: BudgetChart,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <div className="chartContainer">
        <BudgetChart
          budgetData={args.budgetData}
          expenseData={args.expenseData}
          budgetIsFetching={args.budgetIsFetching}
          budgetIsSuccess={args.budgetIsSuccess}
          expenseIsFetching={args.expenseIsFetching}
          expenseIsSuccess={args.expenseIsSuccess}
        />
      </div>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  budgetData: initBudgetData,
  expenseData: initExpenseData,
  budgetIsFetching: false,
  budgetIsSuccess: true,
  expenseIsFetching: false,
  expenseIsSuccess: true,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  budgetData: initBudgetData,
  expenseData: initExpenseData,
  budgetIsFetching: false,
  budgetIsSuccess: true,
  expenseIsFetching: false,
  expenseIsSuccess: true,
};
