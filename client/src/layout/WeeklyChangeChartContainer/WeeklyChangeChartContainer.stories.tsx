import { Meta, Story } from "@storybook/react/types-6-0";

import { ReportsState } from "../../models/reports";
import { WeeklyChangeChartContainer } from "./WeeklyChangeChartContainer";
import { weeklyReportsData } from "../../resources/mockData";

interface TemplateProps {
  theme: string;
  reportsData: ReportsState[];
  reportsIsFetching: boolean;
  reportsIsSuccess: boolean;
}

export default {
  title: "Layout/Weekly Change Chart Container",
  component: WeeklyChangeChartContainer,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body className="chartContainer">
        <WeeklyChangeChartContainer
          weeklyData={args.reportsData}
          weeklyIsFetching={args.reportsIsFetching}
          weeklyIsSuccess={args.reportsIsSuccess}
        />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  reportsData: weeklyReportsData,
  reportsIsFetching: false,
  reportsIsSuccess: true,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  reportsData: weeklyReportsData,
  reportsIsFetching: false,
  reportsIsSuccess: true,
};
