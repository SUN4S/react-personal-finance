import { Meta, Story } from "@storybook/react/types-6-0";

import { HistoryList } from "./HistoryList";
import { mockExpense } from "../../resources/mockData";
import withMock from "storybook-addon-mock";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Layout/History List",
  component: HistoryList,
  decorators: [withMock],
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          height: "100vh",
          backgroundColor: "var(--sidebar-bg)",
          padding: "8px",
        }}
      >
        <HistoryList />
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
