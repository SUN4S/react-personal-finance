import { Meta, Story } from "@storybook/react/types-6-0";

import { Monthly } from "./Monthly";

export default {
  title: "Pages/Monthly",
  component: Monthly,
} as Meta;

interface TemplateProps {
  theme: string;
}

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body style={{ height: "100vh", backgroundColor: "var(--page-bg)" }}>
        <Monthly />
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
