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
      <body style={{ height: "50px", width: "50px" }}>
        <CollapseButton clickFunction={args.onClick} />
      </body>
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
