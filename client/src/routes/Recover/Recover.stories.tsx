import { Meta, Story } from "@storybook/react/types-6-0";

import { Recover } from "./Recover";
import withMock from "storybook-addon-mock";

export default {
  title: "Pages/Recover",
  component: Recover,
  decorators: [withMock],
} as Meta;

interface TemplateProps {
  theme: string;
}

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body>
        <Recover />
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
