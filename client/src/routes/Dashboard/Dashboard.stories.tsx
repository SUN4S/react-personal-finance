import { Meta, Story } from "@storybook/react/types-6-0";
import { mockBudget, mockExpense } from "../../resources/mockData";

import { Dashboard } from "./Dashboard";
import withMock from "storybook-addon-mock";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Pages/Dashboard",
  component: Dashboard,
  decorators: [withMock],
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
