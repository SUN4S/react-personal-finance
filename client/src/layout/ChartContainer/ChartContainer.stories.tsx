import { Meta, Story } from "@storybook/react/types-6-0";
import {
  mockBudget,
  mockExpense,
  weeklyReportsData,
} from "../../resources/mockData";

import { ChartContainer } from "./ChartContainer";
import withMock from "storybook-addon-mock";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Layout/Chart Container",
  component: ChartContainer,
  decorators: [withMock],
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          backgroundColor: "var(--sidebar-bg)",
          padding: "8px",
        }}
      >
        <ChartContainer />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
};

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
    {
      url: "http://localhost:3030/api/reports/weeklyReports",
      method: "GET",
      status: 200,
      response: weeklyReportsData,
    },
  ],
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
};

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
    {
      url: "http://localhost:3030/api/reports/weeklyReports",
      method: "GET",
      status: 200,
      response: weeklyReportsData,
    },
  ],
};
