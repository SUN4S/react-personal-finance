import { Meta, Story } from "@storybook/react/types-6-0";

import { FormInput } from "./FormInput";
import { FormInputProps } from "../../models/inputs";
import { useForm } from "react-hook-form";

interface TemplateProps extends FormInputProps {
  theme: string;
}

export default {
  title: "Components/Form Input",
  component: FormInput,
} as Meta;

const Template: Story<TemplateProps> = (args) => {
  const { register } = useForm();
  return (
    <html data-theme={args.theme}>
      <body
        style={{
          width: "400px",
          backgroundColor: "var(--sidebar-bg)",
          padding: "8px",
        }}
      >
        <FormInput
          labelFor={args.labelFor}
          label={args.label}
          name={args.name}
          inputTestId={args.inputTestId}
          required={args.required}
          type={args.type}
          placeholder={args.placeholder}
          register={register}
        />
      </body>
    </html>
  );
};

export const Default_Light = Template.bind({});
Default_Light.args = {
  theme: "light",
  labelFor: "name",
  label: "Enter your name: ",
  name: "name",
  inputTestId: "input",
  required: true,
  type: "text",
  step: 0.1,
  placeholder: "Your name here",
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  labelFor: "name",
  label: "Enter your name: ",
  name: "name",
  inputTestId: "input",
  required: true,
  type: "text",
  step: 0.1,
  placeholder: "Your name here",
};
