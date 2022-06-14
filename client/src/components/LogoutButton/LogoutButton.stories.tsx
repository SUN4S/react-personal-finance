import { Meta, Story } from "@storybook/react/types-6-0";

import { LogoutButton } from "./LogoutButton";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Components/Logout Button",
  component: LogoutButton,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <LogoutButton />
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
