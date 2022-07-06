import { Meta, Story } from "@storybook/react/types-6-0";
import { mockBudget, mockExpense } from "../../resources/mockData";

import { History } from "./History";
import withMock from "storybook-addon-mock";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Pages/History",
  component: History,
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
        <History />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.parameters = {
  mockData: [
    {
      url: "http://localhost:3030/api/expenses",
      method: "GET",
      status: 200,
      response: mockExpense,
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
      url: "http://localhost:3030/api/expenses",
      method: "GET",
      status: 200,
      response: mockExpense,
    },
  ],
};
Default_Dark.args = {
  theme: "dark",
};
