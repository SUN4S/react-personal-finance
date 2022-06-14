import { Meta, Story } from "@storybook/react/types-6-0";

import { Sidebar } from "./Sidebar";

interface TemplateProps {
  theme: string;
}
export default {
  title: "Layout/Sidebar",
  component: Sidebar,
};

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        }}
      >
        <Sidebar />
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
