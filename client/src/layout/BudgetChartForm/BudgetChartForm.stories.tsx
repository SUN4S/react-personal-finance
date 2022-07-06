import { Meta, Story } from "@storybook/react/types-6-0";

import { BudgetChartForm } from "./BudgetChartForm";

interface TemplateProps {
  theme: string;
  editable: boolean;
  closeFunction: Function;
}

export default {
  title: "Layout/Budget Chart Form",
  component: BudgetChartForm,
};

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
        <BudgetChartForm
          editable={args.editable}
          closeFunction={args.closeFunction}
        />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  editable: false,
  closeFunction: () => alert("Hello there"),
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  editable: false,
  closeFunction: () => alert("Hello there"),
};
