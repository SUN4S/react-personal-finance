import { Meta, Story } from "@storybook/react/types-6-0";

import { App } from "./App";
import { withRouter } from "storybook-addon-react-router-v6";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Pages/App",
  component: App,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body>
        <App />
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
