import { Meta, Story } from "@storybook/react/types-6-0";

import { RecoveryForm } from "./RecoveryForm";
import withMock from "storybook-addon-mock";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Layout/Password Recovery Form",
  component: RecoveryForm,
  decorators: [withMock],
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          width: "400px",
          padding: "8px",
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <RecoveryForm />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.parameters = {
  mockData: [
    {
      url: "http://localhost:3030/api/user/recoverPassword",
      method: "POST",
      status: 200,
      response: { msg: "Email Sent" },
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
      url: "http://localhost:3030/api/user/recoverPassword",
      method: "POST",
      status: 200,
      response: { msg: "Email Sent" },
    },
  ],
};
Default_Dark.args = {
  theme: "dark",
};
