import "./FormTextarea.scss";

import { FormTextareaProps } from "../../models/inputs";

export const FormTextarea: React.FC<FormTextareaProps> = ({
  labelFor,
  label,
  name,
  required,
  placeholder,
  register,
}) => {
  return (
    <label htmlFor={labelFor}>
      {label}
      <textarea
        {...register(name, { required: required })}
        placeholder={placeholder}
      />
    </label>
  );
};
