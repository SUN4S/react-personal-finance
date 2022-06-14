import { Meta, Story } from "@storybook/react/types-6-0";

import { Header } from "./Header";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Layout/Header",
  component: Header,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          backgroundColor: "var(--page-bg)",
          padding: "8px",
        }}
      >
        <Header />
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
