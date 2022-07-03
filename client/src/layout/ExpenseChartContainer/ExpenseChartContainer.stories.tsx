import { Meta, Story } from "@storybook/react/types-6-0";

import { ExpenseChartContainer } from "./ExpenseChartContainer";
import { ExpenseState } from "../../models/expenses";
import { mockExpense } from "../../resources/mockData";

interface TemplateProps {
  theme: string;
  expenseData: ExpenseState[];
  expenseIsFetching: boolean;
  expenseIsSuccess: boolean;
}

export default {
  title: "Layout/Expense Chart Container",
  component: ExpenseChartContainer,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body className="chartContainer">
        <ExpenseChartContainer
          expenseData={args.expenseData}
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
  expenseData: mockExpense,
  expenseIsFetching: false,
  expenseIsSuccess: true,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  expenseData: mockExpense,
  expenseIsFetching: false,
  expenseIsSuccess: true,
};
