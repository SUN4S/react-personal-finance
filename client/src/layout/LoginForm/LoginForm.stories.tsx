import { Meta, Story } from "@storybook/react/types-6-0";

import { LoginForm } from "./LoginForm";

interface TemplateProps {
  theme: string;
  submitFunction: Function;
  isLoading: boolean;
}

export default {
  title: "Layout/Login Form",
  component: LoginForm,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          width: "400px",
          padding: "8px",
          backgroundColor: "var(--login-form-bg)",
        }}
      >
        <LoginForm
          submitFunction={args.submitFunction}
          isLoading={args.isLoading}
        />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  submitFunction: () => alert("Submit"),
  isLoading: false,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  submitFunction: () => alert("Submit"),
  isLoading: false,
};
