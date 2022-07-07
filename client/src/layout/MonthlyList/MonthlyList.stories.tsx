import { Meta, Story } from "@storybook/react/types-6-0";

import { MonthlyList } from "./MonthlyList";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Layout/Monthly List",
  component: MonthlyList,
};

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          backgroundColor: "var(--sidebar-bg)",
          padding: "8px",
        }}
      >
        <MonthlyList />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
};
