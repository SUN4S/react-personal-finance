import { Meta, Story } from "@storybook/react/types-6-0";

import { DoughnutContainer } from "./BudgetChartDoughnut";
import { ExpenseState } from "../../models/expenses";

interface TemplateProps {
  theme: string;
  budgetData: number;
  expenseData: ExpenseState[];
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
    category: "Unexpected",
    amount: 160,
    date: new Date(),
    description: "This is a random description",
    tags: ["Dog", "Cat", "Cake"],
    receipt: "",
  },
];

export default {
  title: "Components/Budget Chart Container",
  component: DoughnutContainer,
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
        <DoughnutContainer
          budgetData={args.budgetData}
          expenseData={args.expenseData}
        />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  budgetData: 600,
  expenseData: mockData,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  budgetData: 600,
  expenseData: mockData,
};
