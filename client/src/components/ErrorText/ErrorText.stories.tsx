import { Meta, Story } from "@storybook/react/types-6-0";

import { ErrorText } from "./ErrorText";

interface TemplateProps {
  theme: string;
  title: string;
}

export default {
  title: "Components/Error Text",
  component: ErrorText,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          width: "400px",
          backgroundColor: "var(--sidebar-bg)",
          padding: "8px",
        }}
      >
        <ErrorText title={args.title} />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  title: "No Data",
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  title: "No Data",
};
