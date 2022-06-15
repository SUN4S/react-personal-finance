import { Meta, Story } from "@storybook/react/types-6-0";

import { Register } from "./Register";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  title: "Pages/Register",
  component: Register,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: "/login",
    },
  },
} as Meta;

interface TemplateProps {
  theme: string;
}

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body>
        <Register />
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
