import { Meta, Story } from "@storybook/react/types-6-0";

import { WeeklyChangeChart } from "./WeeklyChangeChart";
import { WeeklyChangeChartProps } from "../../models/reports";
import { weeklyChangeChartData } from "../../resources/mockData";

interface TemplateProps {
  theme: string;
  chartData: Array<WeeklyChangeChartProps>;
}

export default {
  title: "Components/Weekly Change Chart",
  component: WeeklyChangeChart,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <div
        className="lineChartContainer"
        style={{
          height: "160px",
          width: "465px",
          padding: "8px",
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <WeeklyChangeChart chartData={args.chartData} />
      </div>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  chartData: weeklyChangeChartData,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  chartData: weeklyChangeChartData,
};
