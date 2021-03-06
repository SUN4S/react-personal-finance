import { Meta, Story } from "@storybook/react/types-6-0";

import { FileInputAvatarForm } from "./FileInputAvatarForm";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Layout/Avatar Form",
  component: FileInputAvatarForm,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          width: "400px",
          padding: "8px",
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <FileInputAvatarForm />
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
