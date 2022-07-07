import { Meta, Story } from "@storybook/react/types-6-0";

import { WeeklyList } from "./WeeklyList";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Layout/Weekly List",
  component: WeeklyList,
};

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
        <WeeklyList />
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
