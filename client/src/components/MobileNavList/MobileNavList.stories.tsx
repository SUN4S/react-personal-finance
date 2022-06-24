import { Meta, Story } from "@storybook/react/types-6-0";

import { MobileNavList } from "./MobileNavList";

interface TemplateProps {
  theme: string;
  onClick: Function;
}

export default {
  title: "Components/Mobile Nav List",
  component: MobileNavList,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <MobileNavList clickFunction={args.onClick} />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  onClick: () => alert("Clicked"),
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  onClick: () => alert("Clicked"),
};
