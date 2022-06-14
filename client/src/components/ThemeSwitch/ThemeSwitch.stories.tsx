import { Meta, Story } from "@storybook/react/types-6-0";

import { ThemeSwitch } from "./ThemeSwitch";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Components/Theme Switch",
  component: ThemeSwitch,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          width: "400px",
          height: "100vh",
          padding: "8px",
          backgroundColor: "var(--page-bg)",
        }}
      >
        <ThemeSwitch />
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
