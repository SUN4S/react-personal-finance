import { Meta, Story } from "@storybook/react/types-6-0";

import { Dashboard } from "./Dashboard";
import withMock from "storybook-addon-mock";
import { withRouter } from "storybook-addon-react-router-v6";

const mockExpense = [
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

const mockBudget = [
  {
    _id: "1234",
    budget: 645,
    budgetDate: "2022-06",
  },
];

interface TemplateProps {
  theme: string;
}

export default {
  title: "Pages/Dashboard",
  component: Dashboard,
  decorators: [withMock, withRouter],
  parameters: {
    reactRouter: {
      routePath: "/",
    },
  },
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          height: "100vh",
          backgroundColor: "var(--page-bg)",
          padding: "8px",
        }}
      >
        <Dashboard />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.parameters = {
  mockData: [
    {
      url: "http://localhost:3030/api/expenses/currentMonth",
      method: "GET",
      status: 200,
      response: mockExpense,
    },
    {
      url: "http://localhost:3030/api/budget/currentBudget",
      method: "GET",
      status: 200,
      response: mockBudget,
    },
  ],
};
Default_Light.args = {
  theme: "light",
};

export const Default_Dark = Template.bind({});
Default_Dark.parameters = {
  mockData: [
    {
      url: "http://localhost:3030/api/expenses/currentMonth",
      method: "GET",
      status: 200,
      response: mockExpense,
    },
    {
      url: "http://localhost:3030/api/budget/currentBudget",
      method: "GET",
      status: 200,
      response: mockBudget,
    },
  ],
};
Default_Dark.args = {
  theme: "dark",
};
