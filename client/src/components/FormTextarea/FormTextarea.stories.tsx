import { Meta, Story } from "@storybook/react/types-6-0";

import { FormTextarea } from "./FormTextarea";
import { FormTextareaProps } from "../../models/inputs";
import { useForm } from "react-hook-form";

interface TemplateProps extends FormTextareaProps {
  theme: string;
}

export default {
  title: "Components/Form Textarea",
  component: FormTextarea,
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
        <FormTextarea
          labelFor={args.labelFor}
          label={args.label}
          name={args.name}
          required={args.required}
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
  label: "Enter Some text: ",
  name: "name",
  placeholder: "Text goes here",
  required: true,
};

export const Default_Dark = Template.bind({});
Default_Dark.args = {
  theme: "dark",
  labelFor: "name",
  label: "Enter Some text: ",
  name: "name",
  placeholder: "Text goes here",
  required: true,
};
