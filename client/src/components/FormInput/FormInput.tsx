import "./FormInput.scss";

import { FormInputProps } from "../../models/inputs";

export const FormInput: React.FC<FormInputProps> = ({
  labelFor,
  label,
  inputTestId,
  name,
  required,
  type,
  step,
  placeholder,
  register,
  children,
}) => {
  return (
    <label htmlFor={labelFor} data-testid="formLabel">
      {label}
      {children ? (
        children
      ) : (
        <input
          data-testid={inputTestId}
          type={type}
          step={step}
          {...register(name, { required: required })}
          placeholder={placeholder}
        />
      )}
    </label>
  );
};
