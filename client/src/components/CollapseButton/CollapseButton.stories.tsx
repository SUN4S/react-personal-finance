import { Meta, Story } from "@storybook/react/types-6-0";

import { CollapseButton } from "./CollapseButton";

interface TemplateProps {
  theme: string;
  onClick: Function;
}

export default {
  title: "Components/Collapse Button",
  component: CollapseButton,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <CollapseButton onClick={args.onClick} />
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  onClick: () => alert("clicked"),
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  onClick: () => alert("clicked"),
};
