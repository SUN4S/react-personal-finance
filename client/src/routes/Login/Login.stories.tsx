import { Meta, Story } from "@storybook/react/types-6-0";

import { Login } from "./Login";
import withMock from "storybook-addon-mock";

export default {
  title: "Pages/Login",
  component: Login,
  decorators: [withMock],
  parameters: {
    onSubmit: { actions: "Submited" },
  },
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
Default_Light.parameters = {
  mockData: [
    {
      url: "http://localhost:3030/api/login",
      method: "POST",
      status: 200,
      response: { msg: "Successfully Logged In" },
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
      url: "http://localhost:3030/api/login",
      method: "POST",
      status: 200,
      response: {
        msg: "Logged in successfully",
        username: "User123",
        image: "Image.jpg",
      },
    },
  ],
};
Default_Dark.args = {
  theme: "dark",
};
