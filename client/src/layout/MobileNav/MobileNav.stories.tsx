import { Meta, Story } from "@storybook/react/types-6-0";

import { MobileNav } from "./MobileNav";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Layout/MobileNav",
  component: MobileNav,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body>
        <MobileNav />
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
