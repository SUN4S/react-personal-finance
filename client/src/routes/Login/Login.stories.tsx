import { Meta, Story } from "@storybook/react/types-6-0";

import { Login } from "./Login";

export default {
  title: "Pages/Login",
  component: Login,
} as Meta;

interface TemplateProps {
  theme: string;
}

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body>
        <Login />
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
