import { Meta, Story } from "@storybook/react/types-6-0";

import { ExpenseListItem } from "./ExpenseListItem";
import { ExpenseState } from "../../models/expenses";

interface TemplateProps {
  theme: string;
  expenseData: ExpenseState;
}

const mockData = {
  category: "Unexpected",
  amount: 1223,
  date: new Date(),
  description: "This is a random description",
  tags: ["Dog", "Cat", "Cake"],
  receipt: "",
};

export default {
  title: "Components/Expense List Item",
  component: ExpenseListItem,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <div
        style={{
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <ExpenseListItem expenseData={args.expenseData} />
      </div>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  expenseData: mockData,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  expenseData: mockData,
};
