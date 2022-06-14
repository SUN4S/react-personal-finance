import { Meta, Story } from "@storybook/react/types-6-0";

import { LoadingBox } from "./LoadingBox";

interface TemplateProps {
  theme: string;
  size: string;
}

export default {
  title: "Components/Loading Box",
  component: LoadingBox,
  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
  },
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <div
        style={{
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <LoadingBox size={args.size} />
      </div>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  size: "sm",
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  size: "sm",
};
