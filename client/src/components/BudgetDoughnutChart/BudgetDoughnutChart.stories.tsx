import { Meta, Story } from "@storybook/react/types-6-0";

import { BudgetDoughnutChart } from "./BudgetDoughnutChart";
import { barChartData } from "../../resources/mockData";

interface TemplateProps {
  theme: string;
  expenseAmount: Number;
  remainingBudget: Number;
}

export default {
  title: "Components/Budget Doughnut Chart",
  component: BudgetDoughnutChart,
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
        <BudgetDoughnutChart
          expenseAmount={args.expenseAmount}
          remainingBudget={args.remainingBudget}
        />
      </div>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  expenseAmount: 600,
  remainingBudget: 200,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  expenseAmount: 600,
  remainingBudget: 200,
};
