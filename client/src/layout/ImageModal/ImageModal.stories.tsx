import { Meta, Story } from "@storybook/react/types-6-0";

import { ImageModal } from "./ImageModal";

interface TemplateProps {
  theme: string;
}

export default {
  title: "Layout/Image Modal",
  component: ImageModal,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          height: "100vh",
          backgroundColor: "var(--sidebar-bg)",
          padding: "8px",
        }}
      >
        <ImageModal />
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
