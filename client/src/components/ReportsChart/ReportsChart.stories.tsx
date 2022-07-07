import { Meta, Story } from "@storybook/react/types-6-0";

import { ReportsChart } from "./ReportsChart";

interface TemplateProps {
  theme: string;
  totalAmount: number;
  essentialsAmount: number;
}

export default {
  title: "Components/Reports Chart",
  component: ReportsChart,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <div
        className="barchartContainer"
        style={{
          height: "160px",
          width: "465px",
          padding: "8px",
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <ReportsChart
          totalAmount={args.totalAmount}
          spentAmount={args.essentialsAmount}
          color={"#3b82f6"}
          name={"Essentials"}
          shortText={false} // because some names are longer, this is to change allocated text width
        />
      </div>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  totalAmount: 500,
  essentialsAmount: 100,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  totalAmount: 500,
  essentialsAmount: 100,
};
