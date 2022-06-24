import "./FormInput.scss";

import { FormInputProps } from "../../models/inputs";

export const FormInput: React.FC<FormInputProps> = ({
  labelFor,
  label,
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
          data-testid="formInput"
          type={type}
          step={step}
          {...register(name, { required: required })}
          placeholder={placeholder}
        />
      )}
    </label>
  );
};
