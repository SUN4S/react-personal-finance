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
    <label htmlFor={labelFor} data-testid="formLabel">
      {label}
      <textarea
        data-testid="formTextarea"
        {...register(name, { required: required })}
        placeholder={placeholder}
      />
    </label>
  );
};
