import { Meta, Story } from "@storybook/react/types-6-0";

import { ChartError } from "./ChartError";

interface TemplateProps {
  theme: string;
  title: string;
}

export default {
  title: "Components/Chart Error",
  component: ChartError,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <div
        style={{
          width: "400px",
          backgroundColor: "var(--sidebar-bg)",
          padding: "8px",
        }}
      >
        <ChartError title={args.title} />
      </div>
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
