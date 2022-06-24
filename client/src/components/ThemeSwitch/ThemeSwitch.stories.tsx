import { Meta, Story } from "@storybook/react/types-6-0";

import { ThemeSwitch } from "./ThemeSwitch";

interface TemplateProps {
  theme: string;
  currentTheme: string;
  function: Function;
}

export default {
  title: "Components/Theme Switch",
  component: ThemeSwitch,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          width: "400px",
          height: "100vh",
          padding: "8px",
          backgroundColor: "var(--page-bg)",
        }}
      >
        <ThemeSwitch theme={args.currentTheme} clickFunction={args.function} />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  currentTheme: "light",
  function: () => alert("clicked"),
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  currentTheme: "light",
  function: () => alert("clicked"),
};
