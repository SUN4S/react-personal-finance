import { Meta, Story } from "@storybook/react/types-6-0";

import { Button } from "./Button";

interface TemplateProps {
  theme: String;
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  class: string;
  action?: Function;
  disabled: boolean;
  loading: boolean;
}

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    loading: {
      options: [true, false],
      control: { type: "boolean" },
    },
    disabled: {
      options: [true, false],
      control: { type: "boolean" },
    },
  },
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <Button {...args} />
    </html>
  );
};

export const Primary_Light = Template.bind({});
Primary_Light.args = {
  theme: "light",
  type: "button",
  text: "Click Me!",
  class: "primaryBtn",
  disabled: false,
  loading: false,
};

export const Primary_Dark = Template.bind({});
Primary_Dark.args = {
  theme: "dark",
  type: "button",
  text: "Click Me!",
  class: "primaryBtn",
  disabled: false,
  loading: false,
};

export const Secondary_Light = Template.bind({});
Secondary_Light.args = {
  theme: "light",
  type: "button",
  text: "Click Me!",
  class: "secondaryBtn",
  disabled: false,
  loading: false,
};

export const Secondary_Dark = Template.bind({});
Secondary_Dark.args = {
  theme: "dark",
  type: "button",
  text: "Click Me!",
  class: "secondaryBtn",
  disabled: false,
  loading: false,
};

export const Gray_Light = Template.bind({});
Gray_Light.args = {
  theme: "light",
  type: "button",
  text: "Click Me!",
  class: "grayBtn",
  disabled: false,
  loading: false,
};

export const Gray_Dark = Template.bind({});
Gray_Dark.args = {
  theme: "dark",
  type: "button",
  text: "Click Me!",
  class: "grayBtn",
  disabled: false,
  loading: false,
};
