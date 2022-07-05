import { Meta, Story } from "@storybook/react/types-6-0";

import { RegisterForm } from "./RegisterForm";
import withMock from "storybook-addon-mock";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Layout/Registration Form",
  component: RegisterForm,
  decorators: [withMock],
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          width: "400px",
          padding: "8px",
          backgroundColor: "var(--page-bg)",
        }}
      >
        <RegisterForm />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.parameters = {
  mockData: [
    {
      url: "http://localhost:3030/api/register",
      method: "POST",
      status: 200,
      response: { msg: "Successfully Registered" },
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
      url: "http://localhost:3030/api/register",
      method: "POST",
      status: 200,
      response: { msg: "Successfully Registered" },
    },
  ],
};
Default_Dark.args = {
  theme: "dark",
};
