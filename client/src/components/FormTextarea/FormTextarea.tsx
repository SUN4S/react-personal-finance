import "./FormTextarea.scss";

import { FormTextareaProps } from "../../models/inputs";

// creates a form textarea input inside a label
export const FormTextarea: React.FC<FormTextareaProps> = ({
  labelFor,
  label,
  name,
  inputTestId,
  required,
  placeholder,
  register,
}) => {
  return (
    <label htmlFor={labelFor} data-testid="formLabel">
      {label}
      <textarea
        data-testid={inputTestId}
        {...register(name, { required: required })}
        placeholder={placeholder}
      />
    </label>
  );
};
