import { Meta, Story } from "@storybook/react/types-6-0";

import { ExpenseChart } from "./ExpenseChart";
import { ExpenseState } from "../../models/expenses";

interface TemplateProps {
  theme: string;
  expenseData: ExpenseState[];
  expenseIsFetching: boolean;
  expenseIsSuccess: boolean;
}

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

export default {
  title: "Components/Expense Chart",
  component: ExpenseChart,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <div className="chartContainer">
        <ExpenseChart
          expenseData={args.expenseData}
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
  expenseData: mockData,
  expenseIsFetching: false,
  expenseIsSuccess: true,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  expenseData: mockData,
  expenseIsFetching: false,
  expenseIsSuccess: true,
};
