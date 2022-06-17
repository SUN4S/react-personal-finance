import { Meta, Story } from "@storybook/react/types-6-0";

import { ExpenseBarChart } from "./ExpenseBarChart";
import { barChartData } from "../../resources/mockData";

interface DataObject {
  name: string;
  value: number;
}

interface TemplateProps {
  theme: string;
  chartData: DataObject[];
}

export default {
  title: "Components/Expense Bar Chart",
  component: ExpenseBarChart,
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
        <ExpenseBarChart chartData={args.chartData} />
      </div>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  chartData: barChartData,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  chartData: barChartData,
};
