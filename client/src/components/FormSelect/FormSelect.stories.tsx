import { Meta, Story } from "@storybook/react/types-6-0";

import { FormSelect } from "./FormSelect";
import { FormSelectProps } from "../../models/inputs";
import { useForm } from "react-hook-form";

interface TemplateProps extends FormSelectProps {
  theme: string;
}

export default {
  title: "Components/Form Select",
  component: FormSelect,
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
        <FormSelect
          labelFor={args.labelFor}
          label={args.label}
          name={args.name}
          inputTestId={args.inputTestId}
          options={args.options}
          required={args.required}
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
  options: ["Dog", "Cat", "Boat"],
  name: "name",
  inputTestId: "select",
  required: true,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  labelFor: "name",
  label: "Enter your name: ",
  name: "name",
  options: ["Dog", "Cat", "Boat"],
  inputTestId: "select",
  required: true,
};
