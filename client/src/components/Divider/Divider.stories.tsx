import { Meta, Story } from "@storybook/react/types-6-0";

import { Divider } from "./Divider";

interface TemplateProps {
  theme: string;
  text: string;
}

export default {
  title: "Components/Divider",
  component: Divider,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <div
        style={{
          backgroundColor: "var(--sidebar-bg)",
          padding: "8px",
        }}
      >
        <Divider text={args.text} />
      </div>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  text: "OR",
};

export const Dark_Light = Template.bind({});
Dark_Light.args = {
  theme: "dark",
  text: "OR",
};
