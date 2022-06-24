import { Meta, Story } from "@storybook/react/types-6-0";

import { ExpenseListItem } from "./ExpenseListItem";
import { ExpenseState } from "../../models/expenses";
import { mockExpense } from "../../resources/mockData";

interface TemplateProps {
  theme: string;
  expenseData: ExpenseState;
  onClick: Function;
}

export default {
  title: "Components/Expense List Item",
  component: ExpenseListItem,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <ExpenseListItem
          expenseData={args.expenseData}
          clickFunction={args.onClick}
        />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  expenseData: mockExpense[0],
  onClick: () => alert("Clicked"),
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  expenseData: mockExpense[0],
  onClick: () => alert("Clicked"),
};
