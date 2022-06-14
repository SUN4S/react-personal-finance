import { Meta, Story } from "@storybook/react/types-6-0";

import { ExpenseChartContainer } from "./ExpenseChartContainer";
import { ExpenseState } from "../../models/expenses";

let mockData = [
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

interface TemplateProps {
  theme: string;
  expenseData: ExpenseState[];
}

export default {
  title: "Components/Expense Chart Container",
  component: ExpenseChartContainer,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          width: "400px",
          backgroundColor: "var(--sidebar-bg)",
          padding: "8px",
        }}
      >
        <ExpenseChartContainer expenseData={args.expenseData} />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  expenseData: [...mockData],
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  expenseData: [...mockData],
};
